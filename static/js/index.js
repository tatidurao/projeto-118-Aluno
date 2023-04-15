$(document).ready(function(){

    console.log('O Documento está Pronto')

    let date = new Date()
    let current_date = date.toDateString()

    //  exibir a data na página HTML usando JQUERY e JS
    $('').text('Data: ' + current_date)

    
    let review = ""
    let input_data = ""
    let product = ""
    let emotion = ""
    let emoji_url = ""

   
    function ajax_request(api_url , input_data){

        $.ajax({

            // tipo da requisição POST
            type : '',

            
            url : api_url,

            //  dados JSON
            data : JSON.stringify(input_data),

            //  tipo de dado da resposta esperada
            dataType : 'json',

            //  tipo de conteúdo
            contentType : 'application/json',

            //  método success
            success : function(result)
            {
                //  extraia o sentimento e o caminho do emoji
                emotion = result.sentiment
                emoji_url = result.path

                //  atualize o emoticon e o sentimento apropriadamente
                if (product  ==  'Smartphone'){
                    $('#m_emoji').attr('src' , emoji_url)
                    $('#m_emotion').text(emotion)
                    $('#m_emoji').show()
                    $('#m_emotion').show()
                }

                else if (product  ==  'Digital Camera'){
                    $('#c_emoji').attr('src' , emoji_url)
                    $('#c_emotion').text(emotion)
                    $('#c_emoji').show()
                    $('#c_emotion').show()
                }
                //complete os id para headphones
                else if (product  ==  'Headphones'){
                    $('').attr('src' , emoji_url)
                    $('').text(emotion)
                    $('').show()
                    $('').show()
                }
                //complete os id para videogames
                else if (product  ==  'Video Games'){
                    $('').attr('src' , emoji_url)
                    $('').text(emotion)
                    $('').show()
                    $('').show()
                }
            },

           
            error : function(result)
            {
                console.log(result)
            }

        })

        console.log('requisição ajax enviada')
        
    }


    
    $('#m_button').click(function(){

        review = $('#m_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Smartphone'
    })

    //  verifique se o botão Enviar em 'camera' foi clicado e obtenha a avaliação apropriada
    $('').click(function(){

        review = $('').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Digital Camera'
    })

    //  verifique se o botão Enviar em 'headphones' foi clicado e obtenha a avaliação apropriada
    $('').click(function(){

        review = $('').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Headphones'
    })

    //  verifique se o botão Enviar em 'videogame' foi clicado e obtenha a avaliação apropriada
    $('').click(function(){

        review = $('').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Video Games'
    })


    //  se o botão SALVAR for clicado, dispare uma requisição POST na API

    $('').click(function(){

        console.log('botão salvar foi clicado')

       
        input_data = {'date' : date , 'product' : product , 'review' : review , 'sentiment' : emotion}

       
        
        $.ajax({
            type : 'POST',
            url : '/save',
            data : JSON.stringify(input_data),
            dataType : 'json',
            contentType : 'application/json',
            success : function(result){
                console.log(result)
            },
            error : function(result){
                console.log(result)
            }
        })

        // limpando as caixas de texto
        $('#m_textbox').val('')
        $('#c_textbox').val('')
        $('#h_textbox').val('')
        $('#v_textbox').val('')
    })


})

    
