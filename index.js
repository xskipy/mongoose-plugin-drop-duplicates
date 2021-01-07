module.exports = (schema) => {
  const uniquePaths = Object.keys(schema.paths).filter(p => schema.paths[p].options.dropDups);
  const dropDuplicatesHook = function (next) {
    const Model = this.constructor;

    const promises = uniquePaths.map(p => Model.deleteMany({[p]: this[p]}));

    Promise.all(promises).then(next)
      .catch(console.error.bind(console));
  };

  schema.pre('save', dropDuplicatesHook);
  schema.pre('update', dropDuplicatesHook);
};
