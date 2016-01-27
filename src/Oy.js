/**
 * Oy:
 * Exposes `renderTemplate` functionality, along with `Element`, and `PropTypes`.
 * A base template to build emails with.
 *
 * Based on guidelines here:
 * https://github.com/centralcollegenottingham/HTML-Email-Boilerplate-Redux/blob/master/htmlemail-boilerplate-stable-with-guidelines.html
 */

import HTML4 from './utils/HTML4';

import OyElement from './components/OyElement';


export default {
  Element: OyElement,

  PropTypes: {
    rules: (ruleNames) => {
      return (props, propName, componentName) => {
        return ruleNames
          .map((ruleName) => {
            if (typeof ruleName === 'string' || ruleName instanceof String) {
              return require(`./rules/${ruleName}`)(props, propName, componentName);
            } else {
              return ruleName;
            }
          })
          .filter((error) => error instanceof Error)
          [0];
      };
    }
  },

  renderTemplate: (options, generateCustomTemplate) => {
    return generateCustomTemplate ? (
      generateCustomTemplate(options)
    ) : HTML4.generateDefaultTemplate(options);
  }
};
