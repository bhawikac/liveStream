export function flattenMessages(nestedMessages, prefix = '') {
   if(nestedMessages==undefined)
    {return null;}
    return Object.keys(nestedMessages).reduce((messages, key) => {
          let value       = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
        
    }, {});
}
