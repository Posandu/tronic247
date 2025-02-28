/**
 * @type {any}
 */
export const theme = {
	name: 'Tokyo Night Light',
	author: 'Enkia',
	maintainers: ['Enkia <enki77@gmail.com>'],
	type: 'dark',
	semanticTokenColors: {
		'parameter.declaration': {
			foreground: '#8f5e15'
		},
		parameter: {
			foreground: '#634f30'
		},
		'property.declaration': {
			foreground: '#33635c'
		},
		'property.defaultLibrary': {
			foreground: '#006c86'
		},
		'*.defaultLibrary': {
			foreground: '#006c86'
		},
		'variable.defaultLibrary': {
			foreground: '#006c86'
		},
		'variable.declaration': {
			foreground: '#5a3e8e'
		},
		variable: {
			foreground: '#343b58'
		}
	},
	semanticClass: 'tokyo-night-light',
	colors: {
		foreground: '#363c4d',
		descriptionForeground: '#707280',
		disabledForeground: '#707280',
		focusBorder: '#70728033',
		errorForeground: '#5a607d',
		'widget.shadow': '#ffffff00',
		'scrollbar.shadow': '#00000033',
		'badge.background': '#979db833',
		'badge.foreground': '#363c4d',
		'icon.foreground': '#707280',
		'settings.headerForeground': '#2959aa',
		'window.activeBorder': '#cdced1',
		'window.inactiveBorder': '#cdced1',
		'sash.hoverBorder': '#707280',

		'toolbar.activeBackground': '#acb0bf40',
		'toolbar.hoverBackground': '#acb0bf40',

		'extensionButton.prominentBackground': '#2959aaDD',
		'extensionButton.prominentHoverBackground': '#2959aaAA',
		'extensionButton.prominentForeground': '#ffffff',
		'extensionBadge.remoteBackground': '#2959aa',
		'extensionBadge.remoteForeground': '#ffffff',

		'button.background': '#2959aadd',
		'button.hoverBackground': '#2959aaAA',
		'button.secondaryBackground': '#707280',
		'button.foreground': '#ffffff',
		'progressBar.background': '#2959aa',

		'input.background': '#e6e7ed',
		'input.foreground': '#363c4d',
		'input.border': '#c1c2c7',
		'input.placeholderForeground': '#4a5272',
		'inputOption.activeBackground': '#2959aa44',

		'inputValidation.infoForeground': '#000000',
		'inputValidation.infoBackground': '#3d59a15c',
		'inputValidation.infoBorder': '#3d59a1',
		'inputValidation.warningForeground': '#000000',
		'inputValidation.warningBackground': '#c2985b',
		'inputValidation.warningBorder': '#8f5e15',
		'inputValidation.errorForeground': '#e8e9ed',
		'inputValidation.errorBackground': '#85353e',
		'inputValidation.errorBorder': '#942f2f',

		'dropdown.foreground': '#363c4d',
		'dropdown.background': '#e6e7ed',
		'dropdown.border': '#c1c2c7',
		'dropdown.listBackground': '#e6e7ed',

		'activityBar.background': '#d6d8df',
		'activityBar.foreground': '#363c4d',
		'activityBar.activeBorder': '#2959aa',
		'activityBar.inactiveForeground': '#7d7f8f',
		'activityBar.border': '#d6d8df',
		'activityBarBadge.background': '#2959aa',
		'activityBarBadge.foreground': '#fff',

		'activityBarTop.foreground': '#363c4d',
		'activityBarTop.inactiveForeground': '#707280',
		'activityBarTop.activeBorder': '#2959aa',

		'tree.indentGuidesStroke': '#c1c2c7',
		'sideBar.foreground': '#363c4d',
		'sideBar.background': '#d6d8df',
		'sideBar.border': '#c1c2c7',
		'sideBarTitle.foreground': '#363c4d',
		'sideBarSectionHeader.background': '#d6d8df',
		'sideBarSectionHeader.foreground': '#363c4d',
		'sideBarSectionHeader.border': '#c1c2c7',
		'sideBar.dropBackground': '#c1c2c7',

		'list.dropBackground': '#c1c2c7',
		'list.deemphasizedForeground': '#363c4d',
		'list.activeSelectionBackground': '#e6e7ed',

		'list.activeSelectionForeground': '#363c4d',
		'list.inactiveSelectionBackground': '#e6e7ed',
		'list.inactiveSelectionForeground': '#363c4d',
		'list.focusBackground': '#e6e7ed',
		'list.focusForeground': '#363c4d',
		'list.hoverBackground': '#e1e2e8',
		'list.hoverForeground': '#363c4d',

		'list.highlightForeground': '#2959aa',
		'list.invalidItemForeground': '#c97018',
		'list.errorForeground': '#942f2f',
		'list.warningForeground': '#8F5E15',

		'listFilterWidget.background': '#e6e7ed',
		'listFilterWidget.outline': '#2959aa',
		'listFilterWidget.noMatchesOutline': '#a6333f',

		'pickerGroup.foreground': '#363c4d',
		'pickerGroup.border': '#c1c2c7',

		'scrollbarSlider.background': '#90929625',
		'scrollbarSlider.hoverBackground': '#90929620',
		'scrollbarSlider.activeBackground': '#90929632',

		'editorBracketHighlight.foreground1': '#698cd6', //"#7AA2F7",
		'editorBracketHighlight.foreground2': '#68b3de', //"#7DCFFF",
		'editorBracketHighlight.foreground3': '#9a7ecc', //"#BB9AF7",
		'editorBracketHighlight.foreground4': '#25aac2', //"#2AC3DE",
		'editorBracketHighlight.foreground5': '#80a856', //"#9ECE6A",
		'editorBracketHighlight.foreground6': '#cfa25f', //"#e0af68",
		'editorBracketHighlight.unexpectedBracket.foreground': '#bd4040',

		'editorBracketPairGuide.activeBackground1': '#698cd6',
		'editorBracketPairGuide.activeBackground2': '#68b3de',
		'editorBracketPairGuide.activeBackground3': '#9a7ecc',
		'editorBracketPairGuide.activeBackground4': '#25aac2',
		'editorBracketPairGuide.activeBackground5': '#80a856',
		'editorBracketPairGuide.activeBackground6': '#cfa25f',

		'selection.background': '#acb0bf55',
		'editor.background': '#e6e7ed',
		'editor.foreground': '#343b59',
		'editor.foldBackground': '#b2b3b833',
		'editorLink.activeForeground': '#1f2335',

		'editor.selectionBackground': '#acb0bf40',
		'editor.inactiveSelectionBackground': '#acb0bf33',

		'editor.findMatchBackground': '#2d9c9130',
		'editor.findMatchHighlightBackground': '#2d9c9120',

		'editor.findRangeHighlightBackground': '#2959aa15',
		'editor.rangeHighlightBackground': '#b3b6c320',
		'editor.wordHighlightBackground': '#9aa5ce33',
		'editor.wordHighlightStrongBackground': '#9aa5ce66',
		'editor.selectionHighlightBackground': '#9aa5ce55',

		'editorCursor.foreground': '#363c4d',
		'editorIndentGuide.background1': '#d0d4e3',
		'editorIndentGuide.activeBackground1': '#bdc1cf',
		'editorLineNumber.foreground': '#9da0ab',
		'editorLineNumber.activeForeground': '#363c4d',
		'editor.lineHighlightBackground': '#dcdee3',
		'editorWhitespace.foreground': '#e6e7ed',

		'editorMarkerNavigation.background': '#d6d8df',
		// "editorMarkerNavigationError.background": "#ff0000",
		// "editorMarkerNavigationWarning.background": "#e8cc6f",
		// "editorMarkerNavigationInfo.background": "#0000ff",

		'editorHoverWidget.background': '#dcdee3',
		'editorHoverWidget.border': '#c1c2c7',

		'editorBracketMatch.background': '#cdced1',
		'editorBracketMatch.border': '#dcdee3', //"#3b4261",

		'editorOverviewRuler.border': '#c1c2c7',
		'editorOverviewRuler.errorForeground': '#bd4040',
		'editorOverviewRuler.warningForeground': '#8f5e15',
		'editorOverviewRuler.infoForeground': '#1abc9c',
		'editorOverviewRuler.bracketMatchForeground': '#c1c2c7',
		'editorOverviewRuler.findMatchForeground': '#363c4d44',
		'editorOverviewRuler.rangeHighlightForeground': '#363c4d44',
		'editorOverviewRuler.selectionHighlightForeground': '#363c4d22',
		'editorOverviewRuler.wordHighlightForeground': '#5a3e8e55',
		'editorOverviewRuler.wordHighlightStrongForeground': '#5a3e8e66',
		'editorOverviewRuler.modifiedForeground': '#637dbf',
		'editorOverviewRuler.addedForeground': '#71b6bd',
		'editorOverviewRuler.deletedForeground': '#a8626a',

		'editorRuler.foreground': '#c1c2c7',
		'editorError.foreground': '#bd4040',
		'editorWarning.foreground': '#8f5e15',
		'editorInfo.foreground': '#0da0ba',
		'editorHint.foreground': '#0da0ba',

		'editorGutter.modifiedBackground': '#637dbf',
		'editorGutter.addedBackground': '#71b6bd',
		'editorGutter.deletedBackground': '#a8626a',

		'editorGhostText.foreground': '#73767d',

		'minimap.errorHighlight': '#bd4040',

		'editorGroup.border': '#c1c2c7',
		'editorGroup.dropBackground': '#c1c2c7',
		'editorGroupHeader.tabsBorder': '#c1c2c7',
		'editorGroupHeader.tabsBackground': '#d6d8df',
		'editorGroupHeader.noTabsBackground': '#d6d8df',
		'editorGroupHeader.border': '#c1c2c7',

		'editorPane.background': '#e6e7ed',

		'editorWidget.foreground': '#363c4d',
		'editorWidget.background': '#d6d8df',
		'editorWidget.border': '#c1c2c7',
		'editorWidget.resizeBorder': '#70728033',

		'editorSuggestWidget.background': '#dcdee3',
		'editorSuggestWidget.border': '#c1c2c7',
		'editorSuggestWidget.selectedBackground': '#e8e9ed',
		'editorSuggestWidget.highlightForeground': '#2959aa',

		'editorCodeLens.foreground': '#868891',
		// "editorLightBulb.foreground": "#ffe957",
		// "editorLightBulbAutoFix.foreground": "#ffe957",

		'editorInlayHint.foreground': '#606269',

		'peekView.border': '#c1c2c7',
		'peekViewEditor.background': '#dcdee3',
		'peekViewEditor.matchHighlightBackground': '#2959aa22',
		'peekViewTitle.background': '#d6d8df',
		'peekViewTitleLabel.foreground': '#363c4d',
		'peekViewTitleDescription.foreground': '#363c4d',
		'peekViewResult.background': '#d7d9de',
		'peekViewResult.selectionForeground': '#363c4d',
		'peekViewResult.selectionBackground': '#2959aa33',
		'peekViewResult.lineForeground': '#363c4d',
		'peekViewResult.fileForeground': '#363c4d',
		'peekViewResult.matchHighlightBackground': '#2959aa22',

		'diffEditor.insertedTextBackground': '#2d9c9120',
		'diffEditor.removedTextBackground': '#e8686812',
		'diffEditor.insertedLineBackground': '#2d9c9120',
		'diffEditor.removedLineBackground': '#e8686812',
		'diffEditorGutter.insertedLineBackground': '#2d9c9120',
		'diffEditorGutter.removedLineBackground': '#e8686812',
		'diffEditorOverview.insertedForeground': '#2d9c9120',
		'diffEditorOverview.removedForeground': '#e8686812',
		'diffEditor.diagonalFill': '#cacbcf',
		'diffEditor.unchangedCodeBackground': '#c7c9d425',

		'multiDiffEditor.headerBackground': '#e6e7ed',
		'multiDiffEditor.border': '#e6e7ed',

		'breadcrumb.background': '#d6d8df',
		'breadcrumbPicker.background': '#d6d8df',
		'breadcrumb.foreground': '#707280',
		'breadcrumb.focusForeground': '#363c4d',
		'breadcrumb.activeSelectionForeground': '#363c4d',

		'tab.activeBackground': '#dadce3',
		'tab.inactiveBackground': '#d6d8df',
		'tab.activeForeground': '#363c4d',
		'tab.hoverForeground': '#1f222b',
		'tab.hoverBackground': '#dadce3',
		'tab.activeBorder': '#2959aa',
		// "tab.selectedBorderTop": "#e6e7ed",
		'tab.selectedBackground': '#d6d8df',
		'tab.inactiveForeground': '#363c4d',
		'tab.border': '#c1c2c7',
		'tab.unfocusedActiveForeground': '#363c4d',
		'tab.unfocusedInactiveForeground': '#363c4d',
		'tab.unfocusedHoverForeground': '#363c4d',
		'tab.activeModifiedBorder': '#e6e7ed',
		'tab.inactiveModifiedBorder': '#e6e7ed',
		'tab.unfocusedActiveBorder': '#9da0ab',
		'tab.lastPinnedBorder': '#dadbe0',

		'panel.background': '#d6d8df',

		'panel.border': '#c1c2c7',
		'panelTitle.activeForeground': '#363c4d',
		'panelTitle.inactiveForeground': '#707280',
		'panelTitle.activeBorder': '#2959aa',
		'panelInput.border': '#e6e7ed',

		'statusBar.foreground': '#363c4d',
		'statusBar.background': '#d6d8df',
		'statusBar.border': '#c1c2c7',
		'statusBar.noFolderBackground': '#e6e7ed',
		'statusBar.debuggingBackground': '#e6e7ed',
		'statusBar.debuggingForeground': '#363c4d',
		'statusBarItem.activeBackground': '#c1c2c7',
		'statusBarItem.hoverBackground': '#e6e7ed',
		'statusBarItem.prominentBackground': '#c1c2c7',
		'statusBarItem.prominentHoverBackground': '#e6e7ed',

		'titleBar.activeForeground': '#363c4d',
		'titleBar.inactiveForeground': '#363c4d',
		'titleBar.activeBackground': '#d6d8df',
		'titleBar.inactiveBackground': '#d6d8df',
		'titleBar.border': '#c1c2c7',

		'walkThrough.embeddedEditorBackground': '#d6d8df',
		'textLink.foreground': '#2959aa',
		'textLink.activeForeground': '#363c4d',
		'textPreformat.foreground': '#33635c',
		'textBlockQuote.background': '#d6d8df',
		'textCodeBlock.background': '#e6e7ed',
		'textSeparator.foreground': '#707280',

		'debugExceptionWidget.border': '#942f2f',
		'debugExceptionWidget.background': '#acb0bf40',
		'debugToolBar.background': '#e6e7ed',

		'debugConsole.infoForeground': '#166775',
		'debugConsole.errorForeground': '#942f2f',

		'editor.stackFrameHighlightBackground': '#e7e8c8',
		'editor.focusedStackFrameHighlightBackground': '#c5e3d0',
		'debugView.stateLabelForeground': '#363c4d',
		'debugView.stateLabelBackground': '#e6e7ed',
		'debugView.valueChangedHighlight': '#f4f5f8',
		'debugTokenExpression.name': '#2959aa',
		'debugTokenExpression.value': '#40434f',
		'debugTokenExpression.string': '#385f0d',
		'debugTokenExpression.boolean': '#965027',
		'debugTokenExpression.number': '#965027',
		'debugTokenExpression.error': '#942f2f',

		'debugIcon.startForeground': '#2959aa',
		'debugIcon.pauseForeground': '#3e6396',
		'debugIcon.stepOverForeground': '#3e6396',
		'debugIcon.stepIntoForeground': '#3e6396',
		'debugIcon.stepOutForeground': '#3e6396',
		'debugIcon.continueForeground': '#3e6396',
		'debugIcon.stepBackForeground': '#3e6396',
		'debugIcon.breakpointForeground': '#db4b4b',
		'debugIcon.breakpointDisabledForeground': '#707280',
		'debugIcon.breakpointUnverifiedForeground': '#c24242',

		'terminal.background': '#d6d8df',
		'terminal.foreground': '#343B58',
		'terminal.selectionBackground': '#acb0bf40',
		'terminalCursor.foreground': '#707280',

		'terminal.ansiBlack': '#343B58',
		'terminal.ansiRed': '#8c4351',
		'terminal.ansiGreen': '#33635c',
		'terminal.ansiYellow': '#8f5e15',
		'terminal.ansiBlue': '#2959aa',
		'terminal.ansiMagenta': '#7b43ba',
		'terminal.ansiCyan': '#006c86',
		'terminal.ansiWhite': '#707280',
		'terminal.ansiBrightBlack': '#343B58',
		'terminal.ansiBrightRed': '#8c4351',
		'terminal.ansiBrightGreen': '#33635c',
		'terminal.ansiBrightYellow': '#8f5e15',
		'terminal.ansiBrightBlue': '#2959aa',
		'terminal.ansiBrightMagenta': '#7b43ba',
		'terminal.ansiBrightCyan': '#006c86',
		'terminal.ansiBrightWhite': '#707280',

		'gitDecoration.modifiedResourceForeground': '#2959aa',
		'gitDecoration.ignoredResourceForeground': '#707280',
		'gitDecoration.deletedResourceForeground': '#914c54',
		'gitDecoration.renamedResourceForeground': '#166775',
		'gitDecoration.addedResourceForeground': '#166775',
		'gitDecoration.untrackedResourceForeground': '#166775',
		'gitDecoration.conflictingResourceForeground': '#8f5e15',
		'gitDecoration.stageDeletedResourceForeground': '#914c54',
		'gitDecoration.stageModifiedResourceForeground': '#2959aa',

		'notebook.editorBackground': '#e6e7ed',
		'notebook.cellEditorBackground': '#d6d8df',
		'notebook.cellBorderColor': '#c1c2c7',
		'notebook.focusedCellBorder': '#707280',
		'notebook.cellStatusBarItemHoverBackground': '#e6e7ed',

		'charts.red': '#8c4351',
		'charts.blue': '#2959aa',
		'charts.yellow': '#8f5e15',
		'charts.orange': '#965027',
		'charts.green': '#33635c',
		'charts.purple': '#5a3e8e',
		'charts.foreground': '#40434f',
		'charts.lines': '#f4f5f8',

		// "scmGraph.historyItemHoverLabelForeground": "#1b1e2e",
		'scmGraph.foreground1': '#8F5E15',
		'scmGraph.foreground2': '#cfa25f',
		'scmGraph.foreground3': '#41a6b5',
		'scmGraph.foreground4': '#506FCA',
		'scmGraph.foreground5': '#7b43ba',
		'scmGraph.historyItemHoverAdditionsForeground': '#385F0D',
		'scmGraph.historyItemHoverDeletionsForeground': '#8c4351',
		'scmGraph.historyItemRefColor': '#2959aa',
		'scmGraph.historyItemRemoteRefColor': '#41a6b5',
		'scmGraph.historyItemBaseRefColor': '#7b43ba',
		//"scmGraph.historyItemHoverDefaultLabelForeground": "#a9b1d6",

		'merge.currentHeaderBackground': '#007a75aa',
		'merge.currentContentBackground': '#007a7544',
		'merge.incomingHeaderBackground': '#2959aaaa',
		'merge.incomingContentBackground': '#2959aa44',
		'mergeEditor.change.background': '#007a7522',
		'mergeEditor.change.word.background': '#007a7522',
		'mergeEditor.conflict.unhandledUnfocused.border': '#bb7a6188',
		'mergeEditor.conflict.unhandledFocused.border': '#bb7a61',
		'mergeEditor.conflict.handledUnfocused.border': '#007a7525',
		'mergeEditor.conflict.handledFocused.border': '#007a7525',
		'mergeEditor.conflict.handled.minimapOverViewRuler': '#007a75',
		'mergeEditor.conflict.unhandled.minimapOverViewRuler': '#bb7a61',

		'gitlens.trailingLineForegroundColor': '#73767d',
		'gitlens.gutterUncommittedForegroundColor': '#2959aa',
		'gitlens.gutterForegroundColor': '#363c4d',
		'gitlens.gutterBackgroundColor': '#dcdee3',

		'notificationCenterHeader.background': '#dcdee3',
		'notifications.background': '#dcdee3',
		'notificationLink.foreground': '#2959aa',
		'notificationsErrorIcon.foreground': '#bb616b',
		'notificationsWarningIcon.foreground': '#bba461',
		'notificationsInfoIcon.foreground': '#637dbf',

		'menubar.selectionForeground': '#343b58',
		'menubar.selectionBackground': '#7a85a8',
		'menubar.selectionBorder': '#c1c2c7',
		'menu.foreground': '#363c4d',
		'menu.background': '#d6d8df',
		'menu.selectionForeground': '#343b58',
		'menu.selectionBackground': '#7a85a8',
		'menu.separatorBackground': '#c1c2c7',
		'menu.border': '#c1c2c7',

		'chat.requestBorder': '#c1c2c7',
		'chat.avatarBackground': '#2959aa',
		'chat.avatarForeground': '#e6e7ed',
		'chat.slashCommandBackground': '#e6e7ed',
		'chat.slashCommandForeground': '#2959aa',

		'inlineChat.foreground': '#363c4d',
		'inlineChatInput.background': '#e6e7ed',
		'inlineChatDiff.inserted': '#2d9c9130',
		'inlineChatDiff.removed': '#e8686842'
	},
	tokenColorCustomizations: {
		'property.readonly': {
			foreground: '#35166d'
		},
		'variable.declaration': {
			foreground: '#5a3e8e'
		},
		'variable.local': {
			foreground: '#343b58'
		}
		// "*.declaration": {
		//     "fontStyle": "underline"
		// }
	},
	tokenColors: [
		{
			name: 'Italics - Comments, Storage, Keyword Flow, Vue attributes, Decorators',
			scope: [
				'comment',
				'meta.var.expr storage.type',
				'keyword.control.flow',
				'keyword.control.return',
				'meta.directive.vue punctuation.separator.key-value.html',
				'meta.directive.vue entity.other.attribute-name.html',
				'tag.decorator.js entity.name.tag.js',
				'tag.decorator.js punctuation.definition.tag.js',
				'storage.modifier',
				'string.quoted.docstring.multi',
				'string.quoted.docstring.multi.python punctuation.definition.string.begin',
				'string.quoted.docstring.multi.python punctuation.definition.string.end',
				'string.quoted.docstring.multi.python constant.character.escape'
			],
			settings: {
				fontStyle: 'italic'
			}
		},
		{
			name: 'Fix YAML block scalar, Python Logical',
			scope: ['keyword.control.flow.block-scalar.literal', 'keyword.control.flow.python'],
			settings: {
				fontStyle: ''
			}
		},
		{
			name: 'Comment',
			scope: [
				'comment',
				'comment.block.documentation',
				'punctuation.definition.comment',
				'comment.block.documentation punctuation',
				'string.quoted.docstring.multi',
				'string.quoted.docstring.multi.python punctuation.definition.string.begin',
				'string.quoted.docstring.multi.python punctuation.definition.string.end',
				'string.quoted.docstring.multi.python constant.character.escape'
			],
			settings: {
				foreground: '#888b94'
			}
		},
		{
			name: 'Comment Doc',
			scope: [
				'keyword.operator.assignment.jsdoc',
				'comment.block.documentation variable',
				'comment.block.documentation storage',
				'comment.block.documentation keyword',
				'comment.block.documentation support',
				'comment.block.documentation markup',
				'comment.block.documentation markup.inline.raw.string.markdown',
				'meta.other.type.phpdoc.php keyword.other.type.php',
				'meta.other.type.phpdoc.php support.other.namespace.php',
				'meta.other.type.phpdoc.php punctuation.separator.inheritance.php',
				'meta.other.type.phpdoc.php support.class',
				'keyword.other.phpdoc.php',
				'log.date'
			],
			settings: {
				foreground: '#6c6e75'
			}
		},
		{
			name: 'Comment Doc Emphasized',
			scope: [
				'meta.other.type.phpdoc.php support.class',
				'comment.block.documentation storage.type',
				'comment.block.documentation punctuation.definition.block.tag',
				'comment.block.documentation entity.name.type.instance'
			],
			settings: {
				foreground: '#606269'
				//"fontStyle": "bold"
			}
		},
		{
			name: 'Number, Boolean, Undefined, Null',
			scope: [
				'variable.other.constant',
				'punctuation.definition.constant',
				'constant.language',
				'constant.numeric',
				'support.constant',
				'constant.other.caps'
			],
			settings: {
				foreground: '#965027'
			}
		},
		{
			name: 'String, Symbols',
			scope: [
				'string',
				'constant.other.symbol',
				'constant.other.key',
				'meta.attribute-selector',
				'string constant.character'
			],
			settings: {
				fontStyle: '',
				foreground: '#385f0d'
			}
		},
		{
			name: 'Colors',
			scope: [
				'constant.other.color',
				'constant.other.color.rgb-value.hex punctuation.definition.constant'
			],
			settings: {
				foreground: '#40434f'
			}
		},
		{
			name: 'Invalid',
			scope: ['invalid', 'invalid.illegal'],
			settings: {
				foreground: '#942f2f'
			}
		},
		{
			name: 'Invalid deprecated',
			scope: 'invalid.deprecated',
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: 'Storage Type',
			scope: 'storage.type',
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: 'Storage - modifier, var, const, let',
			scope: ['meta.var.expr storage.type', 'storage.modifier'],
			settings: {
				foreground: '#7b43ba'
			}
		},
		{
			name: 'Interpolation / PHP tags / Smarty tags',
			scope: [
				'punctuation.definition.template-expression',
				'punctuation.section.embedded',
				'meta.embedded.line.tag.smarty',
				'support.constant.handlebars',
				'punctuation.section.tag.twig'
			],
			settings: {
				foreground: '#0f4b6e'
			}
		},
		{
			name: 'Blade, Twig, Smarty Handlebars keywords',
			scope: [
				'keyword.control.smarty',
				'keyword.control.twig',
				'support.constant.handlebars keyword.control',
				'keyword.operator.comparison.twig',
				'keyword.blade',
				'entity.name.function.blade',
				'meta.tag.blade keyword.other.type.php'
			],
			settings: {
				foreground: '#006c86'
			}
		},
		{
			name: 'Spread',
			scope: ['keyword.operator.spread', 'keyword.operator.rest'],
			settings: {
				foreground: '#8c4351',
				fontStyle: 'bold'
			}
		},
		{
			name: 'Operator, Misc',
			scope: [
				'keyword.operator',
				'keyword.control.as',
				'keyword.other',
				'keyword.operator.bitwise.shift',
				'punctuation',
				'expression.embbeded.vue punctuation.definition.tag',
				'text.html.twig meta.tag.inline.any.html',
				'meta.tag.template.value.twig meta.function.arguments.twig',
				'meta.directive.vue punctuation.separator.key-value.html',
				'punctuation.definition.constant.markdown',
				'punctuation.definition.string',
				'punctuation.support.type.property-name',
				'text.html.vue-html meta.tag',
				'meta.attribute.directive',
				'punctuation.definition.keyword',
				'punctuation.terminator.rule',
				'punctuation.definition.entity',
				'punctuation.separator.inheritance.php',
				'keyword.other.template',
				'keyword.other.substitution',
				'entity.name.operator',
				'meta.property-list punctuation.separator.key-value',
				'meta.at-rule.mixin punctuation.separator.key-value',
				'meta.at-rule.function variable.parameter.url',
				'meta.embedded.inline.phpx punctuation.definition.tag.begin.html',
				'meta.embedded.inline.phpx punctuation.definition.tag.end.html'
			],
			settings: {
				foreground: '#006C86'
			}
		},
		{
			name: 'Import, Export, From, Default',
			scope: [
				'keyword.control.module.js',
				'keyword.control.import',
				'keyword.control.export',
				'keyword.control.from',
				'keyword.control.default',
				'meta.import keyword.other'
			],
			settings: {
				foreground: '#0f4b6e'
			}
		},
		{
			name: 'Keyword',
			scope: ['keyword', 'keyword.control', 'keyword.other.important'],
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: 'Keyword SQL',
			scope: 'keyword.other.DML',
			settings: {
				foreground: '#0f4b6e'
			}
		},
		{
			name: 'Keyword Operator Logical, Arrow, Ternary, Comparison',
			scope: [
				'keyword.operator.logical',
				'storage.type.function',
				'keyword.operator.bitwise',
				'keyword.operator.ternary',
				'keyword.operator.comparison',
				'keyword.operator.relational',
				'keyword.operator.or.regexp'
			],
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: 'Tag',
			scope: 'entity.name.tag',
			settings: {
				foreground: '#8c4351'
			}
		},
		{
			name: 'Tag - Custom / Unrecognized',
			scope: [
				'entity.name.tag support.class.component',
				'meta.tag.custom entity.name.tag',
				'meta.tag.other.unrecognized.html.derivative entity.name.tag',
				'meta.tag'
			],
			settings: {
				foreground: '#69323d'
			}
		},
		{
			name: 'Tag Punctuation',
			scope: [
				'punctuation.definition.tag',
				'text.html.php meta.embedded.block.html meta.tag.metadata.script.end.html punctuation.definition.tag.begin.html text.html.basic'
			],
			settings: {
				foreground: '#b05467'
			}
		},
		{
			name: 'Tag Punctuation - Custom',
			scope: ['meta.tag.custom punctuation.definition.tag', 'meta.jsx punctuation.definition.tag'],
			settings: {
				foreground: '#69323d'
			}
		},
		{
			name: 'Globals, PHP Constants, etc',
			scope: [
				'constant.other.php',
				'variable.other.global.safer',
				'variable.other.global.safer punctuation.definition.variable',
				'variable.other.global',
				'variable.other.global punctuation.definition.variable',
				'constant.other.haskell'
			],
			settings: {
				foreground: '#8f5e15'
			}
		},
		{
			name: 'Variables',
			scope: [
				'variable',
				'support.variable',
				'string constant.other.placeholder',
				'variable.parameter.handlebars',
				'variable.other.object',
				'meta.fstring',
				'meta.function-call meta.function-call.arguments',
				'meta.embedded.inline.phpx constant.other.php'
			],
			settings: {
				foreground: '#343b58'
			}
		},
		{
			name: 'Variable Array Key',
			scope: 'meta.array.literal variable',
			settings: {
				foreground: '#0f4b6e' //"#33635c"
			}
		},
		{
			name: 'Object Key',
			scope: [
				'meta.object-literal.key',
				'entity.name.type.hcl',
				'string.alias.graphql',
				'string.unquoted.graphql',
				'string.unquoted.alias.graphql',
				'meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js',
				'meta.field.declaration.ts variable.object.property',
				'meta.block entity.name.label'
			],
			settings: {
				foreground: '#33635c'
			}
		},
		{
			name: 'Object Property',
			scope: [
				'variable.other.property',
				'support.variable.property',
				'support.variable.property.dom',
				'meta.function-call variable.other.object.property',
				'variable.other.object.property.cs'
			],
			settings: {
				foreground: '#0f4b6e'
			}
		},
		{
			name: 'Object Property',
			scope: 'variable.other.object.property',
			settings: {
				foreground: '#343b58'
			}
		},
		{
			name: 'Object Literal Member lvl 3 (Vue Prop Validation)',
			scope:
				'meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.object-literal.key',
			settings: {
				foreground: '#296973'
			}
		},
		{
			name: 'C-related Block Level Variables',
			scope: 'source.cpp meta.block variable.other',
			settings: {
				foreground: '#8c4351'
			}
		},
		{
			name: 'Other Variable',
			scope: 'support.other.variable',
			settings: {
				foreground: '#8c4351'
			}
		},
		{
			name: 'Methods',
			scope: [
				'meta.class-method.js entity.name.function.js',
				'entity.name.method.js',
				'variable.function.constructor',
				'keyword.other.special-method',
				'storage.type.cs'
			],
			settings: {
				foreground: '#2959aa'
			}
		},
		{
			name: 'Function Definition',
			scope: [
				'entity.name.function',
				'variable.other.enummember',
				'meta.function-call',
				'meta.function-call entity.name.function',
				'variable.function',
				'meta.definition.method entity.name.function',
				'meta.object-literal entity.name.function'
			],
			settings: {
				foreground: '#2959aa'
			}
		},
		{
			name: 'Function Argument',
			scope: [
				'variable.parameter.function.language.special',
				'variable.parameter',
				'meta.function.parameters punctuation.definition.variable',
				'meta.function.parameter variable'
			],
			settings: {
				foreground: '#8f5e15' //#33635c
			}
		},
		{
			name: 'Constant, Tag Attribute',
			scope: [
				'keyword.other.type.php',
				'storage.type.php',
				'constant.character',
				'constant.escape',
				'keyword.other.unit'
			],
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: 'Variable Definition',
			scope: [
				'meta.definition.variable variable.other.constant',
				'meta.definition.variable variable.other.readwrite',
				'variable.declaration.hcl variable.other.readwrite.hcl',
				'meta.mapping.key.hcl variable.other.readwrite.hcl',
				'variable.other.declaration'
			],
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: 'Inherited Class',
			scope: 'entity.other.inherited-class',
			settings: {
				fontStyle: '',
				foreground: '#65359d'
			}
		},
		{
			name: 'Class, Support, DOM, etc',
			scope: [
				'support.class',
				'support.type',
				'variable.other.readwrite.alias',
				'support.orther.namespace.use.php',
				'meta.use.php',
				'support.other.namespace.php',
				'support.type.sys-types',
				'support.variable.dom',
				'support.constant.math',
				'support.type.object.module',
				'support.constant.json',
				'entity.name.namespace',
				'meta.import.qualifier',
				'variable.other.constant.object'
			],
			settings: {
				foreground: '#006c86'
			}
		},
		{
			name: 'Class Name',
			scope: 'entity.name',
			settings: {
				foreground: '#343b58'
			}
		},
		{
			name: 'Support Function',
			scope: 'support.function',
			settings: {
				foreground: '#006c86'
			}
		},
		{
			name: 'CSS Class and Support',
			scope: [
				'source.css support.type.property-name',
				'source.sass support.type.property-name',
				'source.scss support.type.property-name',
				'source.less support.type.property-name',
				'source.stylus support.type.property-name',
				'source.postcss support.type.property-name',
				'support.type.property-name.css',
				'support.type.vendored.property-name',
				'support.type.map.key'
			],
			settings: {
				foreground: '#2959aa'
			}
		},
		{
			name: 'CSS Font',
			scope: ['support.constant.font-name', 'meta.definition.variable'],
			settings: {
				foreground: '#385f0d'
			}
		},
		{
			name: 'CSS Class',
			scope: [
				'entity.other.attribute-name.class',
				'meta.at-rule.mixin.scss entity.name.function.scss'
			],
			settings: {
				foreground: '#385f0d'
			}
		},
		{
			name: 'CSS ID',
			scope: 'entity.other.attribute-name.id',
			settings: {
				foreground: '#942f2f'
			}
		},
		{
			name: 'CSS Tag',
			scope: 'entity.name.tag.css',
			settings: {
				foreground: '#006c86'
			}
		},
		{
			name: 'CSS Tag Reference, Pseudo & Class Punctuation',
			scope: [
				'entity.other.attribute-name.pseudo-class punctuation.definition.entity',
				'entity.other.attribute-name.pseudo-element punctuation.definition.entity',
				'entity.other.attribute-name.class punctuation.definition.entity',
				'entity.name.tag.reference'
			],
			settings: {
				foreground: '#8f5e15'
			}
		},
		{
			name: 'CSS Punctuation',
			scope: 'meta.property-list',
			settings: {
				foreground: '#484c61' //"#8f5e15"
			}
		},
		{
			name: 'CSS at-rule fix',
			scope: [
				'meta.property-list meta.at-rule.if',
				'meta.at-rule.return variable.parameter.url',
				'meta.property-list meta.at-rule.else'
			],
			settings: {
				foreground: '#965027'
			}
		},
		{
			name: 'CSS Parent Selector Entity',
			scope: [
				'entity.other.attribute-name.parent-selector-suffix punctuation.definition.entity.css'
			],
			settings: {
				foreground: '#33635c'
			}
		},
		{
			name: 'CSS Punctuation comma fix',
			scope: 'meta.property-list meta.property-list',
			settings: {
				foreground: '#484c61'
			}
		},
		{
			name: 'SCSS @',
			scope: [
				'meta.at-rule.mixin keyword.control.at-rule.mixin',
				'meta.at-rule.include entity.name.function.scss',
				'meta.at-rule.include keyword.control.at-rule.include'
			],
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: 'SCSS Mixins, Extends, Include Keyword',
			scope: [
				'keyword.control.at-rule.include punctuation.definition.keyword',
				'keyword.control.at-rule.mixin punctuation.definition.keyword',
				'meta.at-rule.include keyword.control.at-rule.include',
				'keyword.control.at-rule.extend punctuation.definition.keyword',
				'meta.at-rule.extend keyword.control.at-rule.extend',
				'entity.other.attribute-name.placeholder.css punctuation.definition.entity.css',
				'meta.at-rule.media keyword.control.at-rule.media',
				'meta.at-rule.mixin keyword.control.at-rule.mixin',
				'meta.at-rule.function keyword.control.at-rule.function',
				'keyword.control punctuation.definition.keyword'
			],
			settings: {
				foreground: '#4f4168'
			}
		},
		{
			name: 'SCSS Include Mixin Argument',
			scope: 'meta.property-list meta.at-rule.include',
			settings: {
				foreground: '#343b58'
			}
		},
		{
			name: 'CSS value',
			scope: 'support.constant.property-value',
			settings: {
				foreground: '#965027'
			}
		},
		{
			name: 'Sub-methods',
			scope: ['entity.name.module.js', 'variable.import.parameter.js', 'variable.other.class.js'],
			settings: {
				foreground: '#343b58'
			}
		},
		{
			name: 'Language methods',
			scope: 'variable.language',
			settings: {
				foreground: '#8c4351'
			}
		},
		{
			name: 'Variable punctuation',
			scope: 'variable.other punctuation.definition.variable',
			settings: {
				foreground: '#343b58'
			}
		},
		{
			name: 'Keyword this with Punctuation, ES7 Bind Operator',
			scope: [
				'source.js constant.other.object.key.js string.unquoted.label.js',
				'variable.language.this punctuation.definition.variable',
				'keyword.other.this'
			],
			settings: {
				foreground: '#8c4351'
			}
		},
		{
			name: 'HTML Attributes',
			scope: [
				'entity.other.attribute-name',
				'text.html.basic entity.other.attribute-name.html',
				'text.html.basic entity.other.attribute-name'
			],
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: 'HTML Character Entity',
			scope: 'text.html constant.character.entity',
			settings: {
				foreground: '#006c86'
			}
		},
		{
			name: 'HTML Character Entity Punctuation',
			scope: 'text.html punctuation.definition.entity',
			settings: {
				foreground: '#006c86'
			}
		},
		{
			name: 'Vue (Vetur / deprecated) Template attributes',
			scope: [
				'entity.other.attribute-name.id.html',
				'meta.directive.vue entity.other.attribute-name.html'
			],
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: "CSS ID's",
			scope: 'source.sass keyword.control',
			settings: {
				foreground: '#2959aa'
			}
		},
		{
			name: 'CSS psuedo selectors',
			scope: [
				'entity.other.attribute-name.pseudo-class',
				'entity.other.attribute-name.pseudo-element',
				'entity.other.attribute-name.placeholder',
				'meta.property-list meta.property-value'
			],
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: 'Inserted',
			scope: 'markup.inserted',
			settings: {
				foreground: '#449dab'
			}
		},
		{
			name: 'Deleted',
			scope: 'markup.deleted',
			settings: {
				foreground: '#914c54'
			}
		},
		{
			name: 'Changed',
			scope: 'markup.changed',
			settings: {
				foreground: '#2959aa'
			}
		},
		{
			name: 'Regular Expressions',
			scope: 'string.regexp',
			settings: {
				foreground: '#3e6968'
			}
		},
		{
			name: 'Regular Expressions - Punctuation',
			scope: 'punctuation.definition.group',
			settings: {
				foreground: '#8c4351'
			}
		},
		{
			name: 'Regular Expressions - Character Class',
			scope: ['constant.other.character-class.regexp'],
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: 'Regular Expressions - Character Class Set',
			scope: [
				'constant.other.character-class.set.regexp',
				'punctuation.definition.character-class.regexp'
			],
			settings: {
				foreground: '#8f5e15'
			}
		},
		{
			name: 'Regular Expressions - Quantifier',
			scope: 'keyword.operator.quantifier.regexp',
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: 'Regular Expressions - Backslash',
			scope: 'constant.character.escape.backslash',
			settings: {
				foreground: '#343b58'
			}
		},
		{
			name: 'Escape Characters',
			scope: 'constant.character.escape',
			settings: {
				foreground: '#363c4d'
			}
		},
		{
			name: 'Decorators',
			scope: [
				'tag.decorator.js entity.name.tag.js',
				'tag.decorator.js punctuation.definition.tag.js'
			],
			settings: {
				foreground: '#2959aa'
			}
		},
		{
			name: 'CSS Units',
			scope: 'keyword.other.unit',
			settings: {
				foreground: '#8c4351'
			}
		},
		{
			name: 'JSON Key - Level 0',
			scope: ['source.json meta.structure.dictionary.json support.type.property-name.json'],
			settings: {
				foreground: '#2959aa'
			}
		},
		{
			name: 'JSON Key - Level 1',
			scope: [
				'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
			],
			settings: {
				foreground: '#006c86'
			}
		},
		{
			name: 'JSON Key - Level 2',
			scope: [
				'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
			],
			settings: {
				foreground: '#0f4b6e'
			}
		},
		{
			name: 'JSON Key - Level 3',
			scope: [
				'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
			],
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: 'JSON Key - Level 4',
			scope: [
				'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
			],
			settings: {
				foreground: '#8f5e15'
			}
		},
		{
			name: 'JSON Key - Level 5',
			scope: [
				'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
			],
			settings: {
				foreground: '#006c86'
			}
		},
		{
			name: 'JSON Key - Level 6',
			scope: [
				'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
			],
			settings: {
				foreground: '#33635c'
			}
		},
		{
			name: 'JSON Key - Level 7',
			scope: [
				'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
			],
			settings: {
				foreground: '#8c4351'
			}
		},
		{
			name: 'JSON Key - Level 8',
			scope: [
				'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
			],
			settings: {
				foreground: '#385f0d'
			}
		},
		{
			name: 'Plain Punctuation',
			scope: 'punctuation.definition.list_item.markdown',
			settings: {
				foreground: '#484c61'
			}
		},
		{
			name: 'Block Punctuation',
			scope: [
				'meta.block',
				'meta.brace',
				'punctuation.definition.block',
				'punctuation.definition.use',
				'punctuation.definition.class',
				'punctuation.definition.begin.bracket',
				'punctuation.definition.end.bracket',
				'punctuation.definition.switch-expression.begin.bracket',
				'punctuation.definition.switch-expression.end.bracket',
				'punctuation.definition.section.switch-block.begin.bracket',
				'punctuation.definition.section.switch-block.end.bracket',
				'punctuation.definition.group.shell',
				'punctuation.definition.parameters',
				'punctuation.definition.arguments',
				'punctuation.definition.dictionary',
				'punctuation.definition.array',
				'punctuation.section'
			],
			settings: {
				foreground: '#484c61'
			}
		},
		{
			name: 'Markdown - Plain',
			scope: ['meta.embedded.block'],
			settings: {
				foreground: '#343b58'
			}
		},
		{
			name: 'HTML text',
			scope: ['meta.tag JSXNested', 'meta.jsx.children', 'text.html', 'text.log'],
			settings: {
				foreground: '#40434f'
			}
		},
		{
			name: 'Markdown - Markup Raw Inline',
			scope: 'text.html.markdown markup.inline.raw.markdown',
			settings: {
				foreground: '#65359d'
			}
		},
		{
			name: 'Markdown - Markup Raw Inline Punctuation',
			scope: 'text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown',
			settings: {
				foreground: '#4E5579'
			}
		},
		{
			name: 'Markdown - Heading 1',
			scope: [
				'heading.1.markdown entity.name',
				'heading.1.markdown punctuation.definition.heading.markdown'
			],
			settings: {
				fontStyle: 'bold',
				foreground: '#363c4d'
			}
		},
		{
			name: 'Markdown - Heading 2',
			scope: [
				'heading.2.markdown entity.name',
				'heading.2.markdown punctuation.definition.heading.markdown'
			],
			settings: {
				fontStyle: 'bold',
				foreground: '#0F4B6E'
			}
		},
		{
			name: 'Markdown - Heading 3',
			scope: [
				'heading.3.markdown entity.name',
				'heading.3.markdown punctuation.definition.heading.markdown'
			],
			settings: {
				fontStyle: 'bold',
				foreground: '#2959aa'
			}
		},
		{
			name: 'Markdown - Heading 4',
			scope: [
				'heading.4.markdown entity.name',
				'heading.4.markdown punctuation.definition.heading.markdown'
			],
			settings: {
				fontStyle: 'bold',
				foreground: '#395b96'
			}
		},
		{
			name: 'Markdown - Heading 5',
			scope: [
				'heading.5.markdown entity.name',
				'heading.5.markdown punctuation.definition.heading.markdown'
			],
			settings: {
				fontStyle: 'bold',
				foreground: '#40434f'
			}
		},
		{
			name: 'Markdown - Heading 6',
			scope: [
				'heading.6.markdown entity.name',
				'heading.6.markdown punctuation.definition.heading.markdown'
			],
			settings: {
				fontStyle: 'bold',
				foreground: '#747ca1'
			}
		},
		{
			name: 'Markup - Italic',
			scope: ['markup.italic', 'markup.italic punctuation'],
			settings: {
				fontStyle: 'italic',
				foreground: '#343b58'
			}
		},
		{
			name: 'Markup - Bold',
			scope: ['markup.bold', 'markup.bold punctuation'],
			settings: {
				fontStyle: 'bold',
				foreground: '#343b58'
			}
		},
		{
			name: 'Markup - Bold-Italic',
			scope: ['markup.bold markup.italic', 'markup.bold markup.italic punctuation'],
			settings: {
				fontStyle: 'bold italic',
				foreground: '#343b58'
			}
		},
		{
			name: 'Markup - Underline',
			scope: ['markup.underline', 'markup.underline punctuation'],
			settings: {
				fontStyle: 'underline'
			}
		},
		{
			name: 'Markdown - Blockquote',
			scope: 'markup.quote punctuation.definition.blockquote.markdown',
			settings: {
				foreground: '#4E5579'
			}
		},
		{
			name: 'Markup - Quote',
			scope: 'markup.quote',
			settings: {
				fontStyle: 'italic'
			}
		},
		{
			name: 'Markdown - Link',
			scope: [
				'string.other.link',
				'markup.underline.link',
				'constant.other.reference.link.markdown',
				'string.other.link.description.title.markdown'
			],
			settings: {
				foreground: '#33635c'
			}
		},
		{
			name: 'Markdown - Fenced Code Block',
			scope: [
				'markup.fenced_code.block.markdown',
				'markup.inline.raw.string.markdown',
				'variable.language.fenced.markdown'
			],
			settings: {
				foreground: '#363c4d'
			}
		},
		{
			name: 'Markdown - Separator',
			scope: 'meta.separator',
			settings: {
				fontStyle: 'bold',
				foreground: '#868891'
			}
		},
		{
			name: 'Markup - Table',
			scope: 'markup.table',
			settings: {
				foreground: '#c0cefc'
			}
		},
		{
			name: 'Token - Info',
			scope: 'token.info-token',
			settings: {
				foreground: '#0db9d7'
			}
		},
		{
			name: 'Token - Warn',
			scope: 'token.warn-token',
			settings: {
				foreground: '#ffdb69'
			}
		},
		{
			name: 'Token - Error',
			scope: 'token.error-token',
			settings: {
				foreground: '#942f2f'
			}
		},
		{
			name: 'Token - Debug',
			scope: 'token.debug-token',
			settings: {
				foreground: '#b267e6'
			}
		},
		{
			name: 'Apache Tag',
			scope: 'entity.tag.apacheconf',
			settings: {
				foreground: '#8c4351'
			}
		},
		{
			name: 'Preprocessor',
			scope: ['meta.preprocessor'],
			settings: {
				foreground: '#33635c'
			}
		},
		{
			name: 'ENV value',
			scope: 'source.env',
			settings: {
				foreground: '#2959aa'
			}
		}
	]
};
