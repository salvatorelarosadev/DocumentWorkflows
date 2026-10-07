/**
 * Markdown Document Engine — Live Numbering Spike 001b
 */

const MDE = Object.freeze({
  MENU: 'MDE',
  AUTO_ENABLED_KEY: 'MDE_AUTO_NUMBERING_ENABLED',
  LAST_SIGNATURE_KEY: 'MDE_AUTO_NUMBERING_LAST_SIGNATURE',
  FIXTURE_TITLE: 'MDE Lab — Live Numbering Prototype 001b',
});

function onOpen() {
  buildMenu_();
  try {
    if (isAutomaticNumberingEnabled_()) {
      mdeShowAutomaticNumberingMonitor();
    }
  } catch (error) {
    console.log('MDE onOpen monitor restore skipped: ' + error.message);
  }
}

function buildMenu_() {
  DocumentApp.getUi()
      .createMenu(MDE.MENU)
      .addItem('Add numbering', 'mdeAddNumbering')
      .addSeparator()
      .addItem('Turn automatic numbering on', 'mdeTurnAutomaticNumberingOn')
      .addItem('Turn automatic numbering off', 'mdeTurnAutomaticNumberingOff')
      .addItem('Open automatic numbering monitor', 'mdeShowAutomaticNumberingMonitor')
      .addSeparator()
      .addItem('Remove numbering', 'mdeRemoveNumbering')
      .addSeparator()
      .addItem('Create / reset test fixture', 'mdeCreateFixture')
      .addItem('Inspect heading structure (log)', 'mdeInspectHeadingStructure')
      .addToUi();
}

function mdeCreateFixture() {
  const ui = DocumentApp.getUi();
  const response = ui.alert(
      'Reset active tab?',
      'This will delete all content in the active Google Docs tab and recreate '
          + 'the Live Numbering Spike 001b fixture.',
      ui.ButtonSet.YES_NO);

  if (response !== ui.Button.YES) return;

  setAutomaticNumberingEnabled_(false);
  clearLastStructureSignature_();

  const ctx = getActiveContext_();
  const body = ctx.body;
  body.clear();

  body.appendParagraph(MDE.FIXTURE_TITLE)
      .setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph(
      'Disposable fixture for testing one-shot and automatic hierarchical '
          + 'heading numbering.');

  appendHeading_(body, 'Introduction', 1);
  body.appendParagraph('Introductory body paragraph.');
  appendHeading_(body, 'Context', 2);
  body.appendParagraph('Context body paragraph.');
  appendHeading_(body, 'Italian scenario', 3);
  body.appendParagraph('Nested body paragraph.');
  appendHeading_(body, 'Objectives', 2);
  body.appendParagraph('Objectives body paragraph.');
  appendHeading_(body, 'Methodology', 1);
  body.appendParagraph('Method body paragraph.');
  appendHeading_(body, 'Validation', 2);
  body.appendParagraph('Validation body paragraph.');

  ui.alert(
      'Fixture created',
      'Automatic numbering is OFF. Use MDE → Add numbering for one-shot mode '
          + 'or MDE → Turn automatic numbering on for live reconciliation.',
      ui.ButtonSet.OK);
}

function mdeAddNumbering() {
  try {
    const result = reconcileNumbering_(true);
    DocumentApp.getUi().alert(
        'Numbering updated',
        result.headingCount + ' native heading(s) reconciled. Automatic '
            + 'numbering remains '
            + (isAutomaticNumberingEnabled_() ? 'ON.' : 'OFF.'),
        DocumentApp.getUi().ButtonSet.OK);
  } catch (error) {
    showErrorAlert_('Numbering could not be updated', error);
  }
}

function mdeTurnAutomaticNumberingOn() {
  try {
    setAutomaticNumberingEnabled_(true);
    clearLastStructureSignature_();
    reconcileNumbering_(true);
    mdeShowAutomaticNumberingMonitor();
  } catch (error) {
    setAutomaticNumberingEnabled_(false);
    showErrorAlert_('Automatic numbering could not be enabled', error);
  }
}

function mdeTurnAutomaticNumberingOff() {
  setAutomaticNumberingEnabled_(false);
  DocumentApp.getUi().alert(
      'Automatic numbering is off',
      'Existing heading numbers are kept. Use Add numbering for one-shot '
          + 'reconciliation or Remove numbering to delete the numbers.',
      DocumentApp.getUi().ButtonSet.OK);
}

function mdeRemoveNumbering() {
  try {
    setAutomaticNumberingEnabled_(false);
    clearLastStructureSignature_();

    const rows = collectHeadingRows_(getActiveContext_().body);
    let changed = 0;

    rows.forEach((row) => {
      const parsed = stripAnyGeneratedPrefix_(row.paragraph.getText());
      if (parsed.prefixLength > 0) {
        replaceLeadingText_(row.paragraph, parsed.prefixLength, '');
        changed += 1;
      }
    });

    DocumentApp.getUi().alert(
        'Numbering removed',
        changed + ' heading prefix(es) removed. Automatic numbering is OFF.',
        DocumentApp.getUi().ButtonSet.OK);
  } catch (error) {
    showErrorAlert_('Numbering could not be removed', error);
  }
}

function mdeShowAutomaticNumberingMonitor() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('MDE automatic numbering');
  DocumentApp.getUi().showSidebar(html);
}

function mdeGetAutomaticNumberingState() {
  const ctx = getActiveContext_();
  const enabled = isAutomaticNumberingEnabled_();
  return {
    enabled: enabled,
    headingCount: collectHeadingRows_(ctx.body).length,
    message: enabled ? 'Automatic numbering is ON.' : 'Automatic numbering is OFF.',
  };
}

function mdeSetAutomaticNumberingEnabled(enabled) {
  enabled = Boolean(enabled);
  setAutomaticNumberingEnabled_(enabled);

  if (enabled) {
    clearLastStructureSignature_();
    const result = reconcileNumbering_(true);
    return {
      enabled: true,
      changed: true,
      headingCount: result.headingCount,
      message: 'Automatic numbering is ON. Numbering reconciled.',
    };
  }

  return {
    enabled: false,
    changed: false,
    message: 'Automatic numbering is OFF. Existing numbers are kept.',
  };
}

function mdeAutoNumberingTick() {
  if (!isAutomaticNumberingEnabled_()) {
    return {enabled: false, changed: false, message: 'Automatic numbering is OFF.'};
  }

  try {
    const result = reconcileNumbering_(false);
    return {
      enabled: true,
      changed: result.changed,
      busy: Boolean(result.busy),
      headingCount: result.headingCount || 0,
      message: result.busy
          ? 'Another MDE numbering operation is running.'
          : (result.changed
              ? 'Structure changed — numbering reconciled.'
              : 'No structural change detected.'),
    };
  } catch (error) {
    return {enabled: true, changed: false, error: true, message: error.message};
  }
}

function mdeInspectHeadingStructure() {
  const rows = collectHeadingRows_(getActiveContext_().body).map((row, index) => ({
    order: index + 1,
    level: row.level,
    text: row.paragraph.getText(),
    headingEnum: String(row.paragraph.getHeading()),
  }));
  console.log(JSON.stringify(rows, null, 2));
  DocumentApp.getUi().alert(
      'Heading structure logged',
      rows.length + ' native heading(s) found. Open the Apps Script execution '
          + 'log to inspect the JSON output.',
      DocumentApp.getUi().ButtonSet.OK);
}

function reconcileNumbering_(force) {
  const lock = LockService.getDocumentLock();
  if (!lock.tryLock(1000)) return {changed: false, busy: true};

  try {
    const ctx = getActiveContext_();
    const rows = collectHeadingRows_(ctx.body);
    validateHeadingHierarchy_(rows);

    const properties = getDocumentProperties_();
    const beforeSignature = buildStructureSignature_(rows);
    const previousSignature = properties.getProperty(MDE.LAST_SIGNATURE_KEY);

    if (!force && beforeSignature === previousSignature) {
      return {changed: false, headingCount: rows.length};
    }

    applyNumberingToRows_(rows);

    const afterRows = collectHeadingRows_(ctx.body);
    properties.setProperty(
        MDE.LAST_SIGNATURE_KEY,
        buildStructureSignature_(afterRows));

    return {changed: true, headingCount: afterRows.length};
  } finally {
    lock.releaseLock();
  }
}

function applyNumberingToRows_(rows) {
  const counters = [0, 0, 0, 0, 0, 0];

  rows.forEach((row) => {
    const level = row.level;
    counters[level - 1] += 1;
    for (let i = level; i < counters.length; i += 1) counters[i] = 0;

    const prefix = buildHeadingPrefix_(counters, level);
    const parsed = stripAnyGeneratedPrefix_(row.paragraph.getText());
    replaceLeadingText_(row.paragraph, parsed.prefixLength, prefix);
  });
}

function buildStructureSignature_(rows) {
  return JSON.stringify(rows.map((row) => [row.level, row.paragraph.getText()]));
}

function isAutomaticNumberingEnabled_() {
  return getDocumentProperties_().getProperty(MDE.AUTO_ENABLED_KEY) === 'true';
}

function setAutomaticNumberingEnabled_(enabled) {
  getDocumentProperties_().setProperty(
      MDE.AUTO_ENABLED_KEY, enabled ? 'true' : 'false');
}

function clearLastStructureSignature_() {
  getDocumentProperties_().deleteProperty(MDE.LAST_SIGNATURE_KEY);
}

function getDocumentProperties_() {
  const properties = PropertiesService.getDocumentProperties();
  if (!properties) {
    throw new Error(
        'Document properties are unavailable. Run MDE as a script bound to '
            + 'the Google Docs document.');
  }
  return properties;
}

function getActiveContext_() {
  const doc = DocumentApp.getActiveDocument();
  if (!doc) throw new Error('No active Google Docs document.');

  const activeTab = doc.getActiveTab();
  if (!activeTab) throw new Error('No active Google Docs tab is available.');

  const tab = activeTab.asDocumentTab();
  return {doc: doc, tab: tab, body: tab.getBody()};
}

function appendHeading_(body, text, level) {
  return body.appendParagraph(text).setHeading(headingEnumForLevel_(level));
}

function collectHeadingRows_(body) {
  return body.getParagraphs()
      .map((paragraph) => ({
        paragraph: paragraph,
        level: headingLevel_(paragraph.getHeading()),
      }))
      .filter((row) => row.level !== null);
}

function validateHeadingHierarchy_(rows) {
  if (rows.length === 0) {
    throw new Error('No Heading 1–6 paragraphs were found in the active tab.');
  }

  let previousLevel = 0;

  rows.forEach((row, index) => {
    if (index === 0 && row.level !== 1) {
      throw new Error(
          'Invalid heading hierarchy: the first structural heading is H'
              + row.level + ', but H1 is required.');
    }

    if (previousLevel > 0 && row.level > previousLevel + 1) {
      throw new Error(
          'Invalid heading hierarchy: H' + previousLevel + ' → H' + row.level
              + ' jump before "' + row.paragraph.getText() + '".');
    }

    previousLevel = row.level;
  });
}

function headingLevel_(heading) {
  const map = {};
  map[DocumentApp.ParagraphHeading.HEADING1] = 1;
  map[DocumentApp.ParagraphHeading.HEADING2] = 2;
  map[DocumentApp.ParagraphHeading.HEADING3] = 3;
  map[DocumentApp.ParagraphHeading.HEADING4] = 4;
  map[DocumentApp.ParagraphHeading.HEADING5] = 5;
  map[DocumentApp.ParagraphHeading.HEADING6] = 6;
  return Object.prototype.hasOwnProperty.call(map, heading) ? map[heading] : null;
}

function headingEnumForLevel_(level) {
  const headings = [
    DocumentApp.ParagraphHeading.HEADING1,
    DocumentApp.ParagraphHeading.HEADING2,
    DocumentApp.ParagraphHeading.HEADING3,
    DocumentApp.ParagraphHeading.HEADING4,
    DocumentApp.ParagraphHeading.HEADING5,
    DocumentApp.ParagraphHeading.HEADING6,
  ];
  if (level < 1 || level > 6) throw new Error('Unsupported heading level: ' + level);
  return headings[level - 1];
}

function buildHeadingPrefix_(counters, level) {
  const number = counters.slice(0, level).join('.');
  return number + (level === 1 ? '. ' : ' ');
}

function stripAnyGeneratedPrefix_(text) {
  const match = text.match(/^\d+(?:\.\d+)*\.?\s+/);
  return {
    prefixLength: match ? match[0].length : 0,
    baseText: match ? text.slice(match[0].length) : text,
  };
}

function replaceLeadingText_(paragraph, charsToDelete, replacement) {
  const text = paragraph.editAsText();
  if (charsToDelete > 0) text.deleteText(0, charsToDelete - 1);
  if (replacement) text.insertText(0, replacement);
}

function showErrorAlert_(title, error) {
  DocumentApp.getUi().alert(
      title,
      error && error.message ? error.message : String(error),
      DocumentApp.getUi().ButtonSet.OK);
}
