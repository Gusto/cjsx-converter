module.exports = function fixTemplateLiteralTransform(file, api) {
  const j = api.jscodeshift;

  const replaced = j(file.source)
    .find(j.JSXExpressionContainer, {
      expression: {
        type: 'TemplateLiteral',
        expressions: [],
        quasis: [
          {
            type: 'TemplateElement',
          },
        ],
      },
    })
    .filter(p => p.parent.node.type === 'JSXElement')
    .replaceWith(p => {
      const siblings = p.parent.node.children;
      let textVal = p.node.expression.quasis[0].value.cooked;
      if (p.node === siblings[0]) {
        textVal = textVal.trimLeft();
      }
      if (p.node === siblings[siblings.length - 1]) {
        textVal = textVal.trimRight();
      }

      return j.jsxText(textVal);
    });

  if (replaced.length > 0) {
    return replaced.toSource();
  }

  return null;
};
