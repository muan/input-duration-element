declare class InputDurationElement extends HTMLElement {
  get value(): number
  set value(value: string | number): null
  get max(): number
  set max(value: string | number): null
  get form(): HTMLFormElement | null
  get name(): string | null
  get type(): string
  defaultValue: number
}
export default InputDurationElement;
declare global {
    interface Window {
        InputDurationElement: typeof InputDurationElement;
    }
    interface HTMLElementTagNameMap {
        'input-duration': InputDurationElement;
    }
}
