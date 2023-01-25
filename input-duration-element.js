class InputDurationElement extends HTMLElement {
  static formAssociated = true

  constructor() {
    super()
    this.internals_ = this.attachInternals()
    this.attachShadow({mode: 'open', delegatesFocus: true})
  }
  
  connectedCallback() {
    if (this._connected) return
    this.setupInputs()
    this._connected = true
    this.defaultValue = Number(this.getAttribute('value')) || 0
    this.value = this.defaultValue
  }

  static get observedAttributes() {
    return ['max']
  }

  attributeChangedCallback(attribute) {
    if (!this.connected) return
    if (attribute === 'max') this._setInputValue()
  }

  _setMaxOfInputs() {
    if (!this.max) return

    this.hourInput.max = Math.floor(this.max / 60 / 60)
    this.minuteInput.max = Math.floor(this.max / 60)
    this.secondInput.max = 60
  }
  
  set value(value) {
    this._value = Math.min(this.max || Infinity, Number(value))
    this._setInputValue()
    this.internals_.setFormValue(this._value)
  }

  get value() { return Number(this._value) }
  get form() { return this.internals_.form }
  get name() { return this.getAttribute('name') }
  get type() { return this.localName }
  get validity() { return this.internals_.validity }
  get validationMessage() { return this.internals_.validationMessage }
  get willValidate() { return this.internals_.willValidate }

  checkValidity() { return this.internals_.checkValidity() }
  reportValidity() { return this.internals_.reportValidity() }

  set max(value) {
    this.setAttribute('max', Number(value).toString())
  }

  get max() {
    return Number(this.getAttribute('max'))
  }

  _calculateTimeInSeconds() {
    return (Number(this.secondInput.value) || 0) + 
      (Number(this.minuteInput.value) || 0) * 60 + 
      (Number(this.hourInput.value) || 0) * 60 * 60
  }

  _setInputValue() {
    const seconds = this._value % 60
    const minutes = Math.floor((this._value - seconds) / 60) % 60
    const hours = Math.floor((this._value - seconds - minutes * 60) / (60 * 60))

    if (hours > 99) this.hourInput.max = 999

    this.hourInput.value = hours
    this.minuteInput.value = minutes.toString().padStart(2, '0')
    this.secondInput.value = seconds.toString().padStart(2, '0')

    this.hourInput.size = hours.toString().length
    this.minuteInput.size = 2
    this.secondInput.size = 2

    function pluralize(number, string) {
      return `${number} ${number === 1 ? string : `${string}s`}`
    }
    const parts = []
    if (hours > 0) parts.push(pluralize(hours, 'hour'))
    if (minutes > 0) parts.push(pluralize(minutes, 'minute'))
    parts.push(pluralize(seconds, 'second'))
    this.label.textContent = parts.join(',')

    this.dispatchEvent(new Event('change', {bubbles: true}))
  }

  _setValue() {
    this.value = this._calculateTimeInSeconds()
  }

  setupInputs() {
    this.shadowRoot.innerHTML = `
      <style id="baseCSS">
      :host {
        display: block;
        font-size: small;
        display: inline-flex;
        align-items: end;
        border: 1px solid;
        padding: 0.2em 0.4em;
        overflow: hidden;
        margin: 0.4em 0;
        gap: 0.4em;
      }
      :host(:focus-within) {
        outline: 1px solid blue;
      }
      input {
        background: transparent; 
        appearance: none; 
        border: 0; 
        text-align: center; 
        padding: 0; 
        line-height: inherit; 
      }
      input:focus { outline: none }
      span:empty, input[max="0"], input[max="0"] + [part="divider"] { display: none }
      #label { position: absolute; top: -500px }
      </style>
      <input type="number" step="1" min="0" max="99" data-hour aria-label="hour">
      <slot name="hour" part="divider"><span>:</span></slot>
      <input type="number" step="1" min="0" max="60" data-minute aria-label="minute">
      <slot name="minute" part="divider"><span>:</span></slot>
      <input type="number" step="1" min="0" max="60" data-second aria-label="second">
      <slot name="second" part="divider"><span></span></slot>
      <span aria-live="polite" id="label"></span>
    `

    this.secondInput  = this.shadowRoot.querySelector('[data-second]')
    this.minuteInput  = this.shadowRoot.querySelector('[data-minute]')
    this.hourInput = this.shadowRoot.querySelector('[data-hour]')
    this.label = this.shadowRoot.querySelector('#label')

    this.secondInput.addEventListener('change', this._setValue.bind(this))
    this.minuteInput.addEventListener('change', this._setValue.bind(this))
    this.hourInput.addEventListener('change', this._setValue.bind(this))

    this._setMaxOfInputs()
  }
}

window.customElements.define('input-duration', InputDurationElement)
