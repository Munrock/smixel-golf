class Pronouner {
    constructor(data){
        this.encoders = {
            f: { sub: 'she', obj: 'her', pop: 'hers', poa: 'her', vtb: 'is' },
            m: { sub: 'he', obj: 'him', pop: 'his', poa: 'his', vtb: 'is' },
            ns: { sub: 'it', obj: 'it', pop: 'its', poa: 'its', vtb: 'is' },
            np: { sub: 'they', obj: 'them', pop: 'theirs', poa: 'their', vtb: 'are' },
        }
        this.pronouns = ['sub', 'obj', 'pop', 'poa', 'vtb'];
        this.names = ['name', 'nick', 'full'];
        this.toon = {};
        this.toon.name = data.name;
        this.toon.pronouns = data.pronouns;
    }


    encode(text, toonId="0") {
        let output = text;
        
        const names = this.names;
        const pronouns = this.pronouns;
        const encoders = this.encoders;
        const toon = this.toon;
       
            
            names.forEach((key) => {
                    let regex = new RegExp('\\[?' + key + toonId + '\\]?', 'gi');
                    output = output.replace(regex, toon.name[key]);

                });
            pronouns.forEach((key) => {
                let regex = new RegExp('\\[?'+key+toonId+'\\]?','gi');
                output = output.replace(regex,encoders[toon.pronouns][key]);
                
            });
       
        return output.split('::');
    }

}

module.exports = Pronouner;



