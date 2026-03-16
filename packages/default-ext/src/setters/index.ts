import StringSetter from "./stringSetter";
import TextSetter from "./textSetter";
import StyleSetter from "./styleSetter";
import RadioGroupSetter from './radioGroupSetter'
import FunctionSetter from "./functionSetter";
import JsonSetter from "./jsonSetter";
import SelectSetter from "./selectSetter"
import BoolSetter from "./boolSetter"
import TextAreaSetter from './textAreaSetter'
import NumberSetter from "./numberSetter";

import type { RegisteredSetter } from 'vitis-lowcode-types'

export const defaultSetters: RegisteredSetter[] =  [
    StringSetter,
    TextSetter,
    StyleSetter,
    RadioGroupSetter,
    FunctionSetter,
    JsonSetter,
    SelectSetter,
    BoolSetter,
    TextAreaSetter,
    NumberSetter,
]