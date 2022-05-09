import manifest from '@neos-project/neos-ui-extensibility';
import { $add, $get } from 'plow-js';
import ListButtonComponent from "./list-button-component";
import React from 'react';
import ListStyleEditing from "./liststyle/liststyleediting";
import { getEnabledListStyles, hasEnabledStyles, setListStyles } from "./config/config";

const addPlugin = (Plugin, isEnabled) => (ckEditorConfiguration, options) => {
	if (!isEnabled || isEnabled(options.editorOptions)) {
		ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
		return $add('plugins', Plugin, ckEditorConfiguration);
	}
	return ckEditorConfiguration;
};

manifest('Lala.ListStyle:ListStyleButton', {}, (globalRegistry, { frontendConfiguration }) => {
	const ckEditorRegistry = globalRegistry.get('ckEditor5');
	const config = ckEditorRegistry.get('config');
	const richtextToolbar = ckEditorRegistry.get('richtextToolbar');
	setListStyles(frontendConfiguration['Lala.ListStyle:Styles']);
	const isEnabled = editorOptions => hasEnabledStyles(getEnabledListStyles(editorOptions));
	config.set('listStyle', addPlugin(ListStyleEditing, isEnabled));

	// ordered list
	richtextToolbar.set('orderedList', {
		commandName: 'numberedList',
		component: ListButtonComponent,
		callbackPropName: 'onClick',
		icon: 'list-ol',
		hoverStyle: 'brand',
		tooltip: 'Neos.Neos.Ui:Main:ckeditor__toolbar__ordered-list',
		isVisible: $get('formatting.ol'),
		isActive: $get('numberedList'),
		listType: 'numberedList'
	});

	// Unordered list
	richtextToolbar.set('unorderedList', {
		commandName: 'bulletedList',
		component: ListButtonComponent,
		callbackPropName: 'onClick',
		icon: 'list-ul',
		hoverStyle: 'brand',
		tooltip: 'Neos.Neos.Ui:Main:ckeditor__toolbar__unordered-list',
		isVisible: $get('formatting.ul'),
		isActive: $get('bulletedList'),
		listType: 'bulletedList'
	});
});
