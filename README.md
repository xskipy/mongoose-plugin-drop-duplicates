# mongoose-plugin-drop-duplicate
A simple plugin that enforces unique fields within documents by dropping existing duplications.

## Install
```
npm install --save mongoose-plugin-drop-duplicate
```

## Uaage
A special key `dropDups` could be used to identify the fields you wish to be unique.

```javasceript
const Schema = mongoose.Schema;
const schema = new Schema({
  email: {
    type: String,
    dropDups: true
  }
});

schema.plugin(require('mongoose-plugin-drop-duplicate'));

const Subscription = mongoose.model('Subscription', schema);

...

new Subscription({email: 'abc@example.com'}).save(); // successful
...
new Subscription({email: 'abc@example.com'}).save(); // also successful, but previous document is removed
...
Subscription.find({}) // only got one record with abc@example.com
```

## Author
Jason Yu

## License
ISC
