/**
 * Markdown Document Engine — Google Docs Structural Spike 001
 *
 * Purpose:
 * - validate native Google Docs heading semantics + generated hierarchy numbers;
 * - validate idempotent re-execution for heading numbering;
 * - provide a small experiment for NamedRanges and Bookmarks as native-backed targets;
 * - keep the spike intentionally independent from Markdown parsing.
 *
 * Scope:
 * - active Google Docs tab only;
 * - Heading 1 through Heading 6;
 * - no custom TOC generation;
 * - no production-grade synchronization.
 */

const MDE_LAB = Object.freeze({
  MENU: 'MDE Lab',
  TARGET_PREFIX: 'MDE::',
  BOOKMARK_PROPERTY_PREFIX: 'MDE_LAB_BOOKMARK::',
  FIXTURE_KEY_FINDING:
      'Key finding paragraph for the target-stability experiment.',
  FIXTURE_METHOD_HEADING: 'Methodology',
});

function onOpen() {
  DocumentApp.getUi()
      .createMenu(MDE_LAB.MENU)
      .addItem('Create / reset test fixture', 'mdeCreateFixture')
      .addSeparator()
      .addItem('Apply hierarchical heading numbers', 'mdeApplyHeadingNumbers')
      .addItem('Remove generated heading numbers', 'mdeRemoveHeadingNumbers')
      .addItem('Inspect heading structure (log)', 'mdeInspectHeadingStructure')
      .addSeparator()
      .addItem('Create experimental targets', 'mdeCreateExperimentalTargets')
      .addItem('Inspect experimental targets', 'mdeInspectExperimentalTargets')
      .addToUi();
}

function mdeCreateFixture() {
  const ui = DocumentApp.getUi();
  const response = ui.alert(
      'Reset active tab?',
      'This will delete all content in the active Google Docs tab and recreate '
          + 'the Structural Spike 001 fixture.',
      ui.ButtonSet.YES_NO);

  if (response !== ui.Button.YES) {
    return;
  }

  const ctx = getActiveContext_();
  const body = ctx.body;
  body.clear();

  body.appendParagraph('MDE Lab — Structural Prototype 001')
      .setHeading(DocumentApp.ParagraphHeading.TITLE);

  body.appendParagraph(
      'This document is a disposable fixture for validating native Google Docs '
          + 'headings, generated numbering, native TOC behavior, NamedRanges, '
          + 'and Bookmarks.');

  appendHeading_(body, 'Introduction', 1);
  body.appendParagraph(
      'Introductory body paragraph. It must remain a normal paragraph.');

  appendHeading_(body, 'Context', 2);
  body.appendParagraph(
      'Context body paragraph. It must remain a normal paragraph.');

  appendHeading_(body, 'Italian scenario', 3);
  body.appendParagraph(
      'Nested body paragraph under the level-three heading.');

  appendHeading_(body, 'Objectives', 2);
  body.appendParagraph('Objectives body paragraph.');

  appendHeading_(body, MDE_LAB.FIXTURE_METHOD_HEADING, 1);
  body.appendParagraph('Method body paragraph before the key finding.');
  body.appendParagraph(MDE_LAB.FIXTURE_KEY_FINDING);

  appendHeading_(body, 'Validation', 2);
  body.appendParagraph('Validation body paragraph.');

  ui.alert(
      'Fixture created',
      'The active tab now contains the test structure. '
          + 'Insert a native Google Docs table of contents manually before '
          + 'running the TOC tests.',
      ui.ButtonSet.OK);
}

function mdeApplyHeadingNumbers() {
  const ctx = getActiveContext_();
  const headingRows = collectHeadingRows_(ctx.body);

  validateHeadingHierarchy_(headingRows);

  const counters = [0, 0, 0, 0, 0, 0];

  headingRows.forEach((row) => {
    const level = row.level;

    counters[level - 1] += 1;
    for (let i = level; i < counters.length; i += 1) {
      counters[i] = 0;
    }

    const prefix = buildHeadingPrefix_(counters, level);
    const parsed = stripGeneratedPrefix_(row.paragraph.getText(), level);

    replaceLeadingText_(row.paragraph, parsed.prefixLength, prefix);
  });

  DocumentApp.getUi().alert(
      'Heading numbering applied',
      headingRows.length + ' native heading(s) processed.',
      DocumentApp.getUi().ButtonSet.OK);
}

function mdeRemoveHeadingNumbers() {
  const ctx = getActiveContext_();
  const headingRows = collectHeadingRows_(ctx.body);
  let changed = 0;

  headingRows.forEach((row) => {
    const parsed = stripGeneratedPrefix_(row.paragraph.getText(), row.level);
    if (parsed.prefixLength > 0) {
      replaceLeadingText_(row.paragraph, parsed.prefixLength, '');
      changed += 1;
    }
  });

  DocumentApp.getUi().alert(
      'Heading numbering removed',
      changed + ' heading prefix(es) removed.',
      DocumentApp.getUi().ButtonSet.OK);
}

function mdeInspectHeadingStructure() {
  const ctx = getActiveContext_();
  const rows = collectHeadingRows_(ctx.body).map((row, index) => ({
    order: index + 1,
    level: row.level,
    text: row.paragraph.getText(),
    headingEnum: String(row.paragraph.getHeading()),
  }));

  console.log(JSON.stringify(rows, null, 2));

  DocumentApp.getUi().alert(
      'Heading structure logged',
      rows.length + ' native heading(s) found. '
          + 'Open the Apps Script execution log to inspect the JSON output.',
      DocumentApp.getUi().ButtonSet.OK);
}

function mdeCreateExperimentalTargets() {
  const ctx = getActiveContext_();
  const properties = PropertiesService.getDocumentProperties();

  if (!properties) {
    throw new Error(
        'Document properties are unavailable. Run this code as a script bound '
            + 'to the Google Docs test document.');
  }

  const definitions = [
    {
      id: 'sec-methodology',
      expectedText: MDE_LAB.FIXTURE_METHOD_HEADING,
      headingLevel: 1,
    },
    {
      id: 'par-key-finding',
      expectedText: MDE_LAB.FIXTURE_KEY_FINDING,
      headingLevel: null,
    },
  ];

  const results = [];

  definitions.forEach((definition) => {
    const paragraph = findFixtureParagraph_(ctx.body, definition);
    if (!paragraph) {
      throw new Error(
          'Target source paragraph not found for "' + definition.id + '". '
              + 'Reset the fixture or restore the expected text.');
    }

    const rangeName = MDE_LAB.TARGET_PREFIX + definition.id;

    ctx.tab.getNamedRanges(rangeName).forEach((namedRange) => {
      namedRange.remove();
    });

    const propertyKey = MDE_LAB.BOOKMARK_PROPERTY_PREFIX + definition.id;
    const previousBookmarkId = properties.getProperty(propertyKey);
    if (previousBookmarkId) {
      const previousBookmark = ctx.tab.getBookmark(previousBookmarkId);
      if (previousBookmark) {
        previousBookmark.remove();
      }
      properties.deleteProperty(propertyKey);
    }

    const range = ctx.tab.newRange()
        .addElement(paragraph)
        .build();

    const namedRange = ctx.tab.addNamedRange(rangeName, range);

    const textElement = getFirstTextElement_(paragraph);
    if (!textElement) {
      throw new Error(
          'Cannot create bookmark for "' + definition.id
              + '": target paragraph has no text element.');
    }

    const position = ctx.tab.newPosition(textElement, 0);
    const bookmark = ctx.tab.addBookmark(position);
    properties.setProperty(propertyKey, bookmark.getId());

    results.push({
      logicalId: definition.id,
      namedRangeName: rangeName,
      namedRangeId: namedRange.getId(),
      bookmarkId: bookmark.getId(),
    });
  });

  console.log(JSON.stringify(results, null, 2));

  DocumentApp.getUi().alert(
      'Experimental targets created',
      'Created NamedRange + Bookmark pairs for '
          + results.map((item) => item.logicalId).join(', ')
          + '. IDs are also written to the execution log.',
      DocumentApp.getUi().ButtonSet.OK);
}

function mdeInspectExperimentalTargets() {
  const ctx = getActiveContext_();
  const properties = PropertiesService.getDocumentProperties();

  const ids = ['sec-methodology', 'par-key-finding'];

  const report = ids.map((id) => {
    const rangeName = MDE_LAB.TARGET_PREFIX + id;
    const namedRanges = ctx.tab.getNamedRanges(rangeName);

    const propertyKey = MDE_LAB.BOOKMARK_PROPERTY_PREFIX + id;
    const bookmarkId = properties ? properties.getProperty(propertyKey) : null;
    const bookmark = bookmarkId ? ctx.tab.getBookmark(bookmarkId) : null;

    return {
      logicalId: id,
      namedRangeCount: namedRanges.length,
      namedRangeIds: namedRanges.map((item) => item.getId()),
      bookmarkId: bookmarkId,
      bookmarkResolves: Boolean(bookmark),
    };
  });

  console.log(JSON.stringify(report, null, 2));

  const summary = report.map((item) =>
    item.logicalId
        + ': NamedRange=' + item.namedRangeCount
        + ', Bookmark=' + (item.bookmarkResolves ? 'OK' : 'MISSING'))
      .join('\n');

  DocumentApp.getUi().alert(
      'Experimental target status',
      summary + '\n\nFull IDs are available in the execution log.',
      DocumentApp.getUi().ButtonSet.OK);
}

function getActiveContext_() {
  const doc = DocumentApp.getActiveDocument();
  if (!doc) {
    throw new Error(
        'No active Google Docs document. This spike must run as a bound script.');
  }

  const activeTab = doc.getActiveTab();
  if (!activeTab) {
    throw new Error('No active Google Docs tab is available.');
  }

  const tab = activeTab.asDocumentTab();

  return {
    doc: doc,
    tab: tab,
    body: tab.getBody(),
  };
}

function appendHeading_(body, text, level) {
  const heading = headingEnumForLevel_(level);
  return body.appendParagraph(text).setHeading(heading);
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
          'Invalid heading hierarchy: the first heading is H' + row.level
              + ', but this spike requires the first structural heading to be H1.');
    }

    if (previousLevel > 0 && row.level > previousLevel + 1) {
      throw new Error(
          'Invalid heading hierarchy: H' + previousLevel + ' -> H' + row.level
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

  if (level < 1 || level > 6) {
    throw new Error('Unsupported heading level: ' + level);
  }

  return headings[level - 1];
}

function buildHeadingPrefix_(counters, level) {
  const number = counters.slice(0, level).join('.');
  return number + (level === 1 ? '. ' : ' ');
}

function stripGeneratedPrefix_(text, level) {
  const regex = level === 1
      ? /^\d+\.\s+/
      : new RegExp('^\\d+(?:\\.\\d+){' + (level - 1) + '}\\s+');

  const match = text.match(regex);

  return {
    prefixLength: match ? match[0].length : 0,
    baseText: match ? text.slice(match[0].length) : text,
  };
}

function replaceLeadingText_(paragraph, charsToDelete, replacement) {
  const text = paragraph.editAsText();

  if (charsToDelete > 0) {
    text.deleteText(0, charsToDelete - 1);
  }

  if (replacement) {
    text.insertText(0, replacement);
  }
}

function findFixtureParagraph_(body, definition) {
  const paragraphs = body.getParagraphs();

  for (let i = 0; i < paragraphs.length; i += 1) {
    const paragraph = paragraphs[i];
    const level = headingLevel_(paragraph.getHeading());

    if (definition.headingLevel !== null) {
      if (level !== definition.headingLevel) {
        continue;
      }

      const baseText = stripGeneratedPrefix_(
          paragraph.getText(),
          definition.headingLevel).baseText;

      if (baseText === definition.expectedText) {
        return paragraph;
      }
    } else if (level === null && paragraph.getText() === definition.expectedText) {
      return paragraph;
    }
  }

  return null;
}

function getFirstTextElement_(paragraph) {
  for (let i = 0; i < paragraph.getNumChildren(); i += 1) {
    const child = paragraph.getChild(i);
    if (child.getType() === DocumentApp.ElementType.TEXT) {
      return child.asText();
    }
  }

  return null;
}
