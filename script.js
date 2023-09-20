( () => {
    var day_input   = $("#day");
    var month_input = $("#month");
    var year_input  = $("#year");
    
    var button = $("#button");
    
    day_input.blur( () => {
        validadeDay( day_input );
    });
    
    month_input.blur( () => {
        validadeMonth( month_input );
    });
    
    year_input.blur( () => {
        validadeYear( year_input );
    });
    
    button.click( () => {
        if( checkFields( day_input, month_input, year_input ) )
        {
            var array_age = calcAge( day_input.val(), month_input.val(), year_input.val() );
            putOnScreen( array_age );
        }
    });
    
    console.log( window.screen.width );
    
    if( window.screen.width < 800)
    {
        console.log("here");
        console.log( $("svg") );
        $("svg").setAttribute("viewBox", "0 0 65 35");
    }
    
    function validadeDay( day )
    {
        try
        {
            if( day.val() == "" )
            {
                throw new Error("O dia não pode ser vazio");
            }
            if( ! isANumber( day.val() ) )
            {
                throw new Error("O dia deve ser um número");
            }
            if( day.val() < 1 || day.val() > 31 )
            {
                throw new Error("O dia deve ser válido");
            }
            validInput( day );
        }
        catch( error )
        {
            invalidInput( day, error.message );
        }
    }
    
    function validadeMonth( month )
    {
        try 
        {
            if( month.val() == "" )
            {
                throw new Error("O mês não pode ser vazio");
            }
            if( ! isANumber( month.val() ) )
            {
                throw new Error("O mês deve ser um número");
            }
            if( month.val() < 1 || month.val() > 12 )
            {
                throw new Error("O mês deve ser válido");
            }
            validInput( month );
        } 
        catch (error) 
        {
            invalidInput( month, error.message );
        }
    }
    
    function validadeYear( year )
    {
        try 
        {
            if( year.val() == "" )
            {
                throw new Error("O ano não pode ser vazio");
            }
            if( ! isANumber( year.val() ) )
            {
                throw new Error("O ano deve ser um número");
            }
            if( year.val() < 1 )
            {
                throw new Error("O ano deve ser válido");
            }
            validInput( year );
        }
        catch (error) 
        {
            invalidInput( year, error.message );            
        }
    }
    
    function isANumber( value )
    {
        console.log( value );
        console.log( !isNaN( value ) );
        return !isNaN( value );
    }
    
    function invalidInput( input_field, error_message )
    {
        input_field.val("");
        
        input_field.removeClass("valid__input");
        input_field.addClass("invalid__input");

        input_field.next().html(error_message);
    }
    
    function validInput( input_field )
    {
        input_field.removeClass("invalid__input");
        input_field.addClass("valid__input");
        
        input_field.next().html("");
    }
    
    function checkFields( day_field, month_field, year_field )
    {
        validadeDay( day_field );
        validadeMonth( month_field );
        validadeYear( year_field );
        
        if( day_field.hasClass("valid__input") && month_field.hasClass("valid__input") && year_field.hasClass("valid__input") )
        {
            return true;
        }
        return false;
    }
    
    function calcAge( day, month, year )
    {
        
        var date = new Date( year_input.val(), month_input.val() - 1, day_input.val() );
        var date_now = new Date();
        
        var day = Math.abs( date_now.getDate() - date.getDate() );
        var month = Math.abs( date_now.getMonth() - date.getMonth() );
        var year = Math.abs( date_now.getFullYear() - date.getFullYear() );
        
        return { 
            "days": day,
            "months": month,
            "years": year
        };
    }
    
    function putOnScreen( array_age )
    {
        var days = $(".display__time__days");
        var months = $(".display__time__months");
        var years = $(".display__time__years");

        var days_text   = `<span>${array_age.days}</span>&nbsp` + ( array_age.days == 1 ? "dia" : "dias" );
        var months_text = `<span>${array_age.months}</span>&nbsp` + ( array_age.months == 1 ? "mês" : "meses" );
        var years_text  = `<span>${array_age.years}</span>&nbsp` + ( array_age.years == 1 ? "ano" : "anos" )
        
        days.html( days_text );
        months.html( months_text );
        years.html( years_text );
    }
    
})()