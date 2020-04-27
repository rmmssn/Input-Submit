import * as React from "react";
import { addPropertyControls, ControlType, Frame } from "framer";

interface IInputProps {
   onPressEnter?: (value:string) => void;
   onValueChange?: (value:string) => void;
   id: string;
   height: number;
   width: number;
   hPadding: number;
   color: string;
   fontSize: number;
   defaultValue?: string;

   placeholder: string;
   placeholderColor: string;
   placeholderColorHover?: string;
   placeholderColorFocus?: string;

   borderColor: string;
   borderColorHover?: string;
   borderColorFocus: string;
   borderWidth: number;
   borderWidthHover?: number;
   borderWidthFocus?: number;

   backgroundColor: string;
   backgroundColorHover?: string;
   backgroundColorFocus?: string;

   radius: number | string;
   isMixed: boolean;
   topLeftRadius: number;
   topRightRadius: number;
   bottomRightRadius: number;
   bottomLeftRadius: number;

   clear: boolean;
   select: boolean;
   blur: boolean;
   type: string;
   tabIndex: number;
   icon?: React.ReactNode;
   iconAction: string;
   iconsPwToggle: React.ReactNode[];
   iconAlign: string;
   iconMargin: number;

   selectionColor?: string;
   selectionBackgroundColor?: string;

}

export function Input(props:IInputProps) {
   
   // Input ID
   const inputId = `input-${props.id}`;
   
   // Search icon
   const icon = props.icon[0];
   const searchIconPosition = {
      left: icon && props.iconAlign === "left",
      right: icon && props.iconAlign === "right"
   }

   // Icons: Password Toggle
   const pwToggleStates = {
      first: props.iconsPwToggle.length > 0 && props.iconsPwToggle[0],
      second: props.iconsPwToggle.length > 1 && props.iconsPwToggle[1]
   }

   // Refs
   const inputRef = React.useRef(null);

   /*
   ** Handlers
   */

   const selectValue = () => {
      inputRef.current.select();
      inputRef.current.setSelectionRange(0, 9999); /* For mobile device */
   }

   const handleKeyPress = (e) => {
      if (e.key === "Enter" && e.target.value.trim().length > 0) {
         props.onPressEnter && props.onPressEnter(e.target.value.trim());
         props.clear && (e.target.value = "");
         props.blur && e.target.blur();
      }
   }

   const handleChange = (e) => {
      props.onValueChange && props.onValueChange(e.target.value.trim());
   }
   
   const handleFocus = (e) => {
      if (e.target.value) {
         props.select && setTimeout(() => {
            selectValue();
         }, 100);
      }
   }

   const handleIconActions = () => {
      if (icon) {
         const action = props.iconAction;

         if (action === "copy") {
            selectValue();
            document.execCommand("copy");

         } else if (action === "clear") {
            inputRef.current.value = "";
            inputRef.current.focus();

         } else if (action === "select") {
            selectValue();

         } else return;
      };
   }

   /*
   ** Password Toggle
   */

   const [pwIsReadable, setPwIsReadable] = React.useState(false);
   const showPwToggle = props.type === "Password" && props.iconsPwToggle.length !== 0;


   /*
   ** Input type
   */

   const getInputType = () => {
      let inputType: string = props.type

      if (props.type === "Password" && pwIsReadable ) {
         inputType = "Text";
      }
      return inputType;
   }


   /*
   ** Icons
   */

   const TextIcon = () => {
      if (icon !== undefined
         && props.type === "Text"
         && !showPwToggle) {

         return (
            <Frame
            // ref={textIconRef}
            id="input-submit__icon"
            width={icon.props.width}
            height={icon.props.height}
            background="none"
            center={"y"}
            right={props.iconAlign === "right" ? props.hPadding : null}
            left={props.iconAlign === "left" ? props.hPadding : null}
            onClick={handleIconActions}
            >
               { icon }
            </Frame>
         )
      } else return null;
   }


   const PwToggleIcon = () => {
      if (props.iconsPwToggle.length !== 0
         && props.type === "Password"
         && showPwToggle) {
         
         const renderIcon = () => {
            if (props.iconsPwToggle.length === 2) {
               return !pwIsReadable ? pwToggleStates.first : pwToggleStates.second;
            } else {
               return pwToggleStates.first;
            }
         }

         return (
            <Frame
            //@ts-ignore
            width={props.iconsPwToggle && pwToggleStates.first.props.width}
            //@ts-ignore
            height={props.iconsPwToggle && pwToggleStates.first.props.height}
            background="none"
            center={"y"}
            //@ts-ignore
            right= {props.hPadding}
            onClick={() => setPwIsReadable(prevState => !prevState)}
            >
               { renderIcon() }
            </Frame>
         )

      } else return null;
   }


   /*
   ** Styles
   */

   const borderRadius = props.isMixed
   ? `${props.topLeftRadius}px ${props.topRightRadius}px ${props.bottomRightRadius}px ${props.bottomLeftRadius}px`
   : `${props.radius}px`;


   const paddingRight = () => {
      let result: number;

      if (props.type === "text") {
         result = searchIconPosition.right
                  ? (props.hPadding + icon.props.width + props.iconMargin)
                  : props.hPadding;
      } else {
         result = showPwToggle
                  // @ts-ignore
                  ? props.hPadding + pwToggleStates.first.props.width + props.iconMargin
                  : props.hPadding;
      }

      return result
   }

   const inputStyle:React.CSSProperties = {
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: borderRadius,
      border: "none",
      outline: "none",
      boxShadow: `inset 0 0 0 ${props.borderWidth}px ${props.borderColor}`,
      textIndent: searchIconPosition.right || !icon || showPwToggle ? props.hPadding : 0,
      paddingRight: paddingRight(),
      paddingLeft: searchIconPosition.left && !showPwToggle ? (props.hPadding + icon.props.width + props.iconMargin) : 0,
      color: props.color,
      fontSize: props.fontSize,
      background: props.backgroundColor
   }


   /*
   ** Pseudo-styles
   */

   const pseudoStyles = `
      #${inputId}::-webkit-input-placeholder {
         color: ${props.placeholderColor};
      }
      #${inputId}:hover::-webkit-input-placeholder {
         color: ${props.placeholderColorHover ? props.placeholderColorHover : props.placeholderColor};
      }
      #${inputId}:focus::-webkit-input-placeholder {
         color: ${props.placeholderColorFocus ? props.placeholderColorFocus : props.placeholderColor};
      }
      #${inputId}:hover {
         box-shadow: inset 0 0 0 ${(props.borderWidthHover ? props.borderWidthHover : props.borderWidth) + "px"} ${props.borderColorHover ? props.borderColorHover : props.borderColor} !important;
         background: ${props.backgroundColorHover ? props.backgroundColorHover : props.backgroundColor}!important;
      }
      #${inputId}:focus,
      #${inputId}:focus:hover {
         box-shadow: inset 0 0 0 ${(props.borderWidthFocus ? props.borderWidthFocus : props.borderWidth) + "px"} ${props.borderColorFocus} !important;
         background: ${props.backgroundColorFocus ? props.backgroundColorFocus : props.backgroundColor} !important;
      }
      #input-submit__icon:hover {
         cursor: ${(props.iconAction !== "none") ? "pointer !important;" : "default;"}
      }
      ${(props.selectionColor || props.selectionBackgroundColor) ? 
         `#${inputId}::selection {
            ${props.selectionColor ? `color: ${props.selectionColor};` : "color: default;"}
            ${props.selectionBackgroundColor && `background-color: ${props.selectionBackgroundColor};`}
         }` 
      : "" }
   `


   /*
   ** Add Stylesheet to <head>
   */

   const createPseudoStyles = () => {
      // Document head
      const documentHead = document.getElementsByTagName('head')[0];

      // Create new Stylesheet
      const newStyleSheet = document.createElement('style');
      newStyleSheet.type = 'text/css';
      newStyleSheet.title = `${inputId}-styles`;
      newStyleSheet.innerHTML = pseudoStyles;

      // Store titles of existing stylesheets in array
      const styleSheetTitles:string[] = [];
      for (let i = 0; i < document.styleSheets.length; i++) {
         const sheet = document.styleSheets[i];
         const title = sheet.title;
         title ? styleSheetTitles.push(title) : undefined;
      }
      
      // Compare existing stylesheets titles with new stylesheet title
      const match = styleSheetTitles.filter((title:string) => {
         title === newStyleSheet.title;
      })

      // Only create newStyleSheet if there's no match
      match.length === 0 && documentHead.appendChild(newStyleSheet);
   }

   React.useEffect(() => {
      createPseudoStyles();
   }, [])


   return (
      <Frame
      position="relative" 
      width={props.width}
      height={props.height}
      background="none" 
      >
         <input
         ref={inputRef}
         id={inputId}
         type={getInputType()}
         placeholder={props.placeholder}
         defaultValue={props.defaultValue ? props.defaultValue : null}
         tabIndex={props.tabIndex}
         onKeyPress={handleKeyPress}
         onChange={handleChange}
         onFocus={handleFocus}
         style={inputStyle}
         />

         <TextIcon />
         <PwToggleIcon/>
      </Frame>
   )
}


/*
** Canvas Props
*/

addPropertyControls(Input, {
   placeholder: {
      type: ControlType.String,
      title: "Placeholder"
   },
   placeholderColor: {
      type: ControlType.Color,
      title: "P. color"
   },
   color: {
      type: ControlType.Color,
      title: "Color"
   },
   fontSize: {
      type: ControlType.Number,
      title: "Font size",
      min: 0,
      max: 96,
      displayStepper: true
   },
   borderWidth: {
      type: ControlType.Number,
      title: "Border",
      min: 0,
      max: 16,
      displayStepper: true
   },
   borderColor: {
      type: ControlType.Color,
      title: "B. color"
   },
   borderColorFocus: {
      type: ControlType.Color,
      title: "B. focus"
   },
   backgroundColor: {
      type: ControlType.Color,
      title: "Bg"
   },
   hPadding: {
      type: ControlType.Number,
      title: "H. padding",
      min: 0,
      max: 80,
      displayStepper: true
   },
   radius: {
      type: ControlType.FusedNumber,
      title: "Radius",
      toggleKey: "isMixed",
      toggleTitles: ["Radius", "Per side"],
      valueKeys: ["topLeftRadius", "topRightRadius", "bottomRightRadius", "bottomLeftRadius"],
      valueLabels: ["TL", "TR", "BR", "BL"],
      min: 0,
   },
   icon: {
      title: "Icon",
      type: ControlType.ComponentInstance,
   },
   iconAlign: {
      type: ControlType.Enum,
      title: "Icon align",
      defaultValue: "left",
      options: ["left", "right"],
      optionTitles: ["Left", "Right"],
      displaySegmentedControl: true
   },
   iconAction: {
      title: "Icon action",
      type: ControlType.Enum,
      options: ["none", "clear", "copy", "select"],
      optionTitles: ["None", "Clear", "Copy", "Select"]
   },
   clear: {
      type: ControlType.Boolean,
      title: "Clear"
   },
   blur: {
      type: ControlType.Boolean,
      title: "Blur"
   },
   select: {
      type: ControlType.Boolean,
      title: "Select"
   },
   type: {
      type: ControlType.SegmentedEnum,
      options: ["Text", "Password"]
   },
   tabIndex: {
      type: ControlType.Number,
      title: "Tab index",
      displayStepper: true
   },
   iconsPwToggle: {
      type: ControlType.Array,
      title: "Password Reveal Toggle",
      propertyControl: {
         type: ControlType.ComponentInstance
      },
      maxCount: 2
   },
})


/*
** Default Props
*/

Input.defaultProps = {
   width: 315,
   height: 60,
   borderWidth: 2,
   borderColor: "#CCC",
   color: "#000",
   placeholder: "Type here...",
   placeholderColor: "#222",
   fontSize: 14,
   hPadding: 12,
   radius: 8,
   backgroundColor: "#FFF",
   clear: true,
   select: true,
   blur: false,
   type: "text",
   icon: undefined,
   iconsPwToggle: undefined,
   iconMargin: 8,
   iconAction: "none"
} as IInputProps;