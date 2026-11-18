> **Unmaintained:** this repository is archived and no longer maintained. It is kept for reference only.

# Lala.ListStyle
Neos Package that adds the option to change the list-style of uls and ols.

## Warning
This package is WIP.

Please keep the following caveats in mind:
* This plugin does not support adding classes to the lists. Instead, it will add an attribute `data-list-style-type="circle"` to the list
* When changing the style of a list, the complete list has to be selected in the editor, otherwise the list will be split up into multiple lists with different styles

## Installation
`composer require lala/list-style:dev-master`

## Usage

1. Enable formatting for a property:
```yaml
'Neos.Demo:Content.Text':
  superTypes:
    'Neos.Neos:Content': true
    'Neos.NodeTypes.BaseMixins:TextMixin': true

  properties:
    text:
      ui:
        inline:
          editorOptions:
            formatting:
              # Enable unordered lists
              ul: true
              # Enabled ordered lists
              ol: true
            # Configure available list styles:
            #  true: enable all
            #  false|null: disable all
            #  ol|ul:
            #    true: enable all for list type
            #    false|null: disable all for list type
            #    [style]: true|false|null
            listStyle:
              ul: true
              ol:
                upper-roman: true
                lower-alpha: ~
```
2. Create a list in the editor
3. Select the whole using the cursor
4. Open the dropdown and change the list style

### Enable list styles for a property
In each of the following cases `true` enables the style(s), while `false` and `null` will disable it equally.
* **enable _all_ configured styles:**  
  `editorOptions.listStyle: true`
* **enable _all_ for a list-type:**  
  `editorOptions.listStyle.ul: true` or `editorOptions.listStyle.ol: ~`
* **enable individual styles:**  
  this can be done with their identifier, e.g. `editorOptions.listStyle.ul.disc`

**Note:** As soon as configuration is available, this will be used, i.e. only specifying `editorOptions.listStyle.ul.square: ~` **will not** enable `ul.*` but `square`.
In the same way setting _only_ `editorOptions.listStyle.ul: false` will not enable any `ol` styles.

## Styling
Please note that this plugin does not supply list styles on it's own.

There is a `ListStyles.css` file in `Resources/Public` that you can include if needed:

```
prototype(Neos.Neos:Page) {
    head.stylesheets {
        listStyles = Neos.Fusion:Component {
            href = Neos.Fusion:ResourceUri {
                path = 'resource://Lala.ListStyle/Public/ListStyles.css'
            }

            renderer = afx`
                <link rel="stylesheet" href={props.href} media="all" />
            `
        }
    }
}
```

## Customization
The available list styles can be customized through the Settings:

```yaml
Lala:
  ListStyle:
    styles:
      ul:
        default:
          value: ''
          title: 'Default'
        circle:
          value: 'neos-list-circle'
          title: 'Circle'
        square:
          value: 'neos-list-square'
          title: 'Square'

        # To disable styles, set them to NULL
        # square: ~
      ol:
        default:
          value: ''
          title: 'Default'
        upper-roman:
          value: 'neos-list-upper-roman'
          title: 'Upper Roman'
        lower-alpha:
          value: 'neos-list-lower-alpha'
          title: 'Lower Alpha'
```

The `title` is used as the button label in the backend, the `value` will be the value of the `list-style-type` attribute of the list.
Make sure to add styling for your custom list styles.
