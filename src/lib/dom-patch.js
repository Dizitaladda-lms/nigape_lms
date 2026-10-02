if (typeof window !== "undefined") {
  if (typeof Node !== "undefined" && Node.prototype) {
    // Patch removeChild to prevent Google Translate / Extension DOM mutation crashes in React
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (child.parentNode !== this) {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("Prevented DOM removeChild parent mismatch:", child, this);
        }
        return child;
      }
      return originalRemoveChild.apply(this, arguments);
    };

    // Patch insertBefore to prevent Google Translate / Extension DOM mutation crashes in React
    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("Prevented DOM insertBefore parent mismatch:", referenceNode, this);
        }
        return newNode;
      }
      return originalInsertBefore.apply(this, arguments);
    };
  }
}
