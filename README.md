# Input Submit

A fully customisable input with props that let you retreive the input value using a simple override (see examples).

### Features
- Get value as the user **types** `onValueChange` or presses **Enter** `onPressEnter`
- Set the type to **Text** or **Password**
- Display an **icon** (left or right) and assign an action to either **copy**, **clear** or **select** the input
- Automatically clear the value on submit (e.g. To-do app), lose focus on submit (e.g. Search) and/or select the value on focus
- Change **background**, **border**, **placeholder** and **text colors** on blur, hover and focus
- Set different **border width** on blur, hover and focus
- Set **selection** highlight **color** and **background color**
- Define a **Tab index** number (useful for forms)
- **Toggle** a password's **reabability** by linking one or two icons
- Set a **placeholder** and **default value**
- and a few more...

### Properties panel

| Label | Type | Description |
|---|---|---|
| Placeholder | `string` | Placeholder value |
| P. color | `string` | Placeholder color |
| Color | `string` | Text color |
| Font size | `number` | Text size |
| Border | `number` | Border width |
| B. color | `string` | Border color |
| B. focus | `string` | Border color on focus |
| Bg | `string` | Background color |
| H. padding | `number` | Horizontal padding |
| Radius | `number` | Border Radius |
| Icon | `Frame` | Icon (for 'Text' type only) | 
| Icon align | `string` | Left / Right |
| Icon action | `string` | None / Clear / Copy / Select |
| Clear | `boolean` | Clear value on submit |
| Blur | `boolean` | Lose focus on submit |
| Select | `boolean` | Select value on focus |
| Type | `string` | Text / Password |
| Tab index | `number` | Order in which inputs get focused |

  
### More Props with Override

| Prop | Type | Description |
|---|---|---|
| onPressEnter | `() => string` | Returns input value on submit |
| onValueChange | `() => string` | Returns input value on keystroke |
| defaultValue | `string` | Default input value |
| placeholderColorHover | `string` | Placeholder color on hover | 
| placeholderColorFocus | `string` | Placeholder color on focus | 
| backgroundColorHover | `string` | Background color on hover |
| backgroundColorFocus | `string` | Background color on focus | 
| borderColorHover | `string` | Border color on hover |
| borderWidthHover | `number` | Border width on hover |
| borderWidthFocus | `number` | Border width on focus |
| iconMargin | `number` | Gap between icon and text (default:12px) |
| selectionColor | `string` | Text color highlight |
| selectionBackgroundColor | `string` | Background color highlight |


### Password Reveal Toggle

You can link one or two frames to toggle the readability of a password.

## Simple example

Create an override to grab the value and store it in a data object
```tsx
import { Data, Override } from 'framer'

const data = Data({
    value: null,
})


/* Create 'Override' to store value of input */
export function InputOverride(): Override {
    return {
        onPressEnter(value) {
            data.value = value
        }
    }
}


/* Create 'Override' to get stored value */
export function GetValue(): Override {
    return {
        myTextLayer: data.value
    }
}
```

## More complete example

```tsx
import { Data, Override } from 'framer'

const data = Data({
    value: null,
})


/* Create Override to store value of input and change style */
export function InputOverride(): Override {
    return {
      defaultValue: 'Bonjour',
      iconMargin: 16,
      borderColorHover: '#AAA',
      borderWidthFocus: 3,
      backgroundColorFocus: '#F2F2F2',
      placeholderColorFocus: '#888',
      selectionColor: 'red',
      selectionBackgroundColor: 'rgba(255,0,0,0.3)',
      onValueChange(value) {
         data.value = value
      },
   }
}


/* Create 'Override' to get stored value */
export function GetValue(): Override {
    return {
        myTextLayer: data.value
    }
}
```

### Github

[github.com/rmmssn/Input-Submit](https://github.com/rmmssn/Input-Submit)

### Feedback

For any comment, please feel free to get in touch [@rmmssn](https://twitter.com/rmmssn)