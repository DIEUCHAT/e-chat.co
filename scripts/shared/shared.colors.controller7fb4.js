var com = com || {};
com.echat = com.echat || {};
com.echat.shared = com.echat.shared || {};
com.echat.shared.colors = com.echat.shared.colors || {};

com.echat.shared.colors.Controller = 
{
    defaultShareFactor: 20,
    
    // todo: can the returned string be used to hack something internally ?
    getRGBString: function(inputColorString)
    {
        var scope = com.echat.shared.colors.Controller;
        
        var rgbObject = scope.getRGBObject(inputColorString);
        
        if(rgbObject !== undefined && rgbObject !== null && rgbObject.isValid === true)
        {
            return 'rgb(' + rgbObject.red + ',' + rgbObject.green + ',' + rgbObject.blue + ')';
        }
    },
            
    //todo: not used
    getShadedRGBString: function(inputColorString, shadeFactor)
    {
        var scope = com.echat.shared.colors.Controller;
        
        if(shadeFactor === undefined || shadeFactor === null)
        {
            shadeFactor = scope.defaultShareFactor;
        }
        
        var rgbObject = scope.getRGBObject(inputColorString);
        
        if(rgbObject !== undefined && rgbObject !== null && rgbObject.isValid === true)
        {
            rgbObject.red -= 20;
            rgbObject.green -= 20;
            rgbObject.blue -= 20;
            
            return 'rgb(' + rgbObject.red + ',' + rgbObject.green + ',' + rgbObject.blue + ')';
        }
    },
    
    getRGBObject: function(inputColorString)
    {
        if(!inputColorString)
        {
            return;
        }
        
        inputColorString += ''; // cast to string
        
        // check for single ('), (`) or double (") quotes. 
        if(inputColorString.charAt(0) === '\'' ||
           inputColorString.charAt(0) === '`' || 
           inputColorString.charAt(0) === '\"')
        {
            inputColorString = inputColorString.substr(1);
        }

        var inputColorStringLength = inputColorString.length;
        if(inputColorString.charAt(inputColorStringLength -1) === '\'' ||
           inputColorString.charAt(inputColorStringLength -1) === '`' || 
           inputColorString.charAt(inputColorStringLength -1) === '\"')
        {
            inputColorString = inputColorString.substr(0, inputColorStringLength - 1);
        }

        // strip any leading #
        if (inputColorString.charAt(0) === '#')
        {
            if(inputColorString.length > 4) // #AABBCC case
            {
                inputColorString = inputColorString.substr(1,6);
            }
            else
            {
                inputColorString = inputColorString.substr(1,3);
            }
        }

        // strip whitespace
        inputColorString = inputColorString.replace(/ /g,'');
        inputColorString = inputColorString.toLowerCase();

        // array of color definition objects
        var colorDefinitions = [
            {
                colorRegex: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
                colorProcessor: function (bits)
                {
                    return [
                        parseInt(bits[1]),
                        parseInt(bits[2]),
                        parseInt(bits[3])
                    ];
                }
            },
            {
                colorRegex: /^(\w{2})(\w{2})(\w{2})$/,
                colorProcessor: function (bits)
                {
                    return [
                        parseInt(bits[1], 16),
                        parseInt(bits[2], 16),
                        parseInt(bits[3], 16)
                    ];
                }
            },
            {
                colorRegex: /^(\w{1})(\w{1})(\w{1})$/,
                colorProcessor: function(bits)
                {
                    return [
                        parseInt(bits[1] + bits[1], 16), //e.g. 'A' + 'A', giving 'AA'
                        parseInt(bits[2] + bits[2], 16),
                        parseInt(bits[3] + bits[3], 16)
                    ];
                }
            }
        ];

        var rgbObject = {};
        rgbObject.isValid = false;

        // search through the definitions to find a match
        for (var i = 0; i < colorDefinitions.length; i++)
        {
            var colorRegex = colorDefinitions[i].colorRegex;
            var colorProcessor = colorDefinitions[i].colorProcessor;

            var bits = colorRegex.exec(inputColorString);
            if (bits)
            {
                var rgbResult = colorProcessor(bits);
                rgbObject.red = rgbResult[0];
                rgbObject.green = rgbResult[1];
                rgbObject.blue = rgbResult[2];
                rgbObject.isValid = true;
            }
        }
        
        if(rgbObject.isValid)
        {
            rgbObject.red = (rgbObject.red < 0 || isNaN(rgbObject.red)) ? 0 : ((rgbObject.red > 255) ? 255 : rgbObject.red);
            rgbObject.green = (rgbObject.green < 0 || isNaN(rgbObject.green)) ? 0 : ((rgbObject.green > 255) ? 255 : rgbObject.green);
            rgbObject.blue = (rgbObject.blue < 0 || isNaN(rgbObject.blue)) ? 0 : ((rgbObject.blue > 255) ? 255 : rgbObject.blue);
        }
        
        return rgbObject;
    }
};
