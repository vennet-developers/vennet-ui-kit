"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateSelector = (selector) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};
const validateTemplate = (template) => {
    if (!template) {
        throw new Error('You need to pass a template for the element');
    }
};
const applyStyles = (config) => {
    if (config.style) {
        return `<style>${config.style}</style>${config.template}`;
    }
    return config.template;
};
exports.CustomElement = (config) => (classDefinition) => {
    validateSelector(config.selector);
    validateTemplate(config.template);
    const template = document.createElement('template');
    template.innerHTML = applyStyles(config);
    const connectedCallback = classDefinition.prototype.connectedCallback || (() => { });
    classDefinition.prototype.connectedCallback = () => {
        const clone = document.importNode(template.content, true);
        if (config.useShadow) {
            classDefinition.attachShadow({ mode: 'open' }).appendChild(clone);
            connectedCallback.call(classDefinition);
        }
    };
    window.customElements.define(config.selector, classDefinition);
};
//# sourceMappingURL=custom-element.decorator.js.map