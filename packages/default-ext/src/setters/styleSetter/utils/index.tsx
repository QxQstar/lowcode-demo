export function removeUnit(value: string) {
  if (value != undefined && value != null) {
    return parseInt(value);
  }

  return undefined;
}

export function addUnit(value: number | string | undefined, unit: string) {
  if (value != undefined && value != null) {
    return value + unit;
  } else {
    return undefined;
  }
}

export function isEmptyValue(value?: string | number | boolean | null) {
  if (value == undefined || value == null) {
    return true;
  }

  return false;
}


export const handleInputChange = (
  styleKey: string,
  value: string,
  onStyleChange: any,
  unit: string = 'px'
) => {
  if (value !== '') {
    if (!isNaN(parseInt(value))) {
      onStyleChange([
        {
          styleKey,
          value: addUnit(value, unit),
        },
      ]);
    }
  } else {
    onStyleChange([
      {
        styleKey,
        value: undefined,
      },
    ]);
  }
};

export const handleInputKeyDown = (
  key: string,
  styleKey: string,
  styleData: any,
  onStyleChange: any,
  unit: string = 'px'
) => {
  const value = styleData[styleKey] || 0;
  if (key === 'ArrowDown') {
    onStyleChange([
      {
        styleKey,
        value: addUnit(parseInt(value) - 1, unit),
      },
    ]);
  } else if (key === 'ArrowUp') {
    onStyleChange([
      {
        styleKey,
        value: addUnit(parseInt(value) + 1, unit),
      },
    ]);
  }
};
