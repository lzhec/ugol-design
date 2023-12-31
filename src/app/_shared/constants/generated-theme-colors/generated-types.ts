/**
 *    This file was auto generated by angular schematics.
 *
 *    For update use script from package.json
 */

export interface ColorData {
  type: 'color' | 'box-shadow' | 'none';
  rgba?: string;
  hex?: string;
  r?: number;
  g?: number;
  b?: number;
  a?: number;
  boxShadowParams?: string[];
}

export interface ColorsMap {
  /** as theme map variable danger-color */
  dangerColor: ColorData;

  /** as theme map variable success-color */
  successColor: ColorData;

  /** as theme map variable success-light-color */
  successLightColor: ColorData;

  /** as theme map variable success-blue-color */
  successBlueColor: ColorData;

  /** as theme map variable warning-color */
  warningColor: ColorData;

  /** as theme map variable bg-main-color */
  bgMainColor: ColorData;

  /** as theme map variable bg-additional-color */
  bgAdditionalColor: ColorData;

  /** as theme map variable bg-block-main-color */
  bgBlockMainColor: ColorData;

  /** as theme map variable bg-extra-color */
  bgExtraColor: ColorData;

  /** as theme map variable text-color */
  textColor: ColorData;

  /** as theme map variable text-additional-color */
  textAdditionalColor: ColorData;

  /** as theme map variable text-additional-2-color */
  textAdditional2Color: ColorData;

  /** as theme map variable text-extra-color */
  textExtraColor: ColorData;

  /** as theme map variable text-inverse-color */
  textInverseColor: ColorData;

  /** as theme map variable text-static-color */
  textStaticColor: ColorData;

  /** as theme map variable text-link-color */
  textLinkColor: ColorData;

  /** as theme map variable border-color */
  borderColor: ColorData;

  /** as theme map variable shadow-color */
  shadowColor: ColorData;

  /** as theme map variable box-shadow */
  boxShadow: ColorData;
}
