window.onload = function(){
    let checkbox = document.getElementById("light_mode");
    let body = document.getElementsByTagName("body");
    let time = new Date();
    let expireTime = time.getTime() + 86400000*30.5;
    time.setTime(expireTime);

    // Function to read a stored cookie
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    // Functions to simplify query selector & query selector All 
    function qs(query){
        return document.querySelector(query);
    }

    function qsA(query){
        return document.querySelectorAll(query);
    }

    let cookie = getCookie("color_mode");

    // Set styles depending on the color_mode cookie
    if(cookie == 'dark'){
        body[0].style.backgroundColor = "#1d1e22";
        body[0].style.color = "white";
        document.cookie = "color_mode=dark;expires="+time;
        qs(".logo-text").style.color = "white";
        qs(".logo img").src = "media/Logo Aplicación Blanco.png";
        var icos = qsA(".menu-left .ico");
        icos.forEach(function(element){
            element.style.filter = "invert(100%)";
        });
        qs(".weather").style.color = "white";
        var search = qsA(".search");
        search.forEach(function(element){
            element.style.backgroundColor = "#686864";
            element.style.boxShadow = "none";
        })
        qs(".left-side").style.boxShadow = "3px 1px 5px -2px black";
        var posts = qsA(".post");
        posts.forEach(function(element){
            element.classList.add("post-dark");
        });
        var see_likes = qsA("#see-likes");
        see_likes.forEach(function(element){
            element.style.filter = 'invert(1)';
        });
        checkbox.checked = true;
    } else if(cookie == 'light' || cookie == null){
        body[0].style.backgroundColor = "white";
        body[0].style.color = "black";
        document.cookie = "color_mode=light;expires="+time;
        qs(".logo-text").style.color = "black";
        qs(".logo img").src = "media/Logo BLANCO.png";
        var icos = qsA(".menu-left .ico");
        icos.forEach(function(element){
            element.style.filter = "invert(0)";
        });
        qs(".weather").style.color = "white";
        var search = qsA(".search");
        search.forEach(function(element){
            element.style.backgroundColor = "white";
            element.style.border = "solid 1px gray";
            element.style.boxShadow = "1px 0.5px 4px gray";
        })
        qs(".left-side").style.boxShadow = "3px 1px 5px -2px gray";
        var posts = qsA(".post");
        posts.forEach(function(element){
            element.classList.add("post-light");
        });
        var see_likes = qsA("#see-likes");
        see_likes.forEach(function(element){
            element.style.filter = 'invert(0)';
        });
        checkbox.checked = false;
    }

    // Set styles and store a cookie if color_mode switch changes
    checkbox.addEventListener('change', function (){
        if(checkbox.checked){ 
            body[0].style.backgroundColor = "#1d1e22";
            body[0].style.color = "white";
            document.cookie = "color_mode=dark;expires="+time;
            qs(".logo-text").style.color = "white";
            qs(".logo img").src = "media/Logo Aplicación Blanco.png";
            var icos = qsA(".menu-left .ico");
            icos.forEach(function(element){
                element.style.filter = "invert(100%)";
            });
            qs(".weather").style.color = "white";
            var search = qsA(".search");
            search.forEach(function(element){
                element.style.backgroundColor = "#686864";
                element.style.boxShadow = "none";
            })
            qs(".left-side").style.boxShadow = "3px 1px 5px -2px black";
            var posts = qsA(".post");
            posts.forEach(function(element){
                element.classList.replace("post-light","post-dark");
            });
            var see_likes = qsA("#see-likes");
            see_likes.forEach(function(element){
                element.style.filter = 'invert(1)';
            });
            var comments = qsA('.form-comm');
            comments.forEach(function(element){
                element.style.backgroundColor = 'rgb(26 30 45)';
            });
        } else{
            body[0].style.backgroundColor = "white";
            body[0].style.color = "black";
            document.cookie = "color_mode=light;expires="+time;
            qs(".logo-text").style.color = "black";
            qs(".logo img").src = "media/Logo BLANCO.png";
            var icos = qsA(".menu-left .ico");
            icos.forEach(function(element){
                element.style.filter = "invert(0)";
            });
            qs(".weather").style.color = "white";
            var search = qsA(".search");
            search.forEach(function(element){
                element.style.backgroundColor = "white";
                element.style.border = "solid 1px gray";
                element.style.boxShadow = "1px 0.5px 4px gray";
            })
            qs(".left-side").style.boxShadow = "3px 1px 5px -2px gray";
            var posts = qsA(".post");
            posts.forEach(function(element){
                element.classList.replace("post-dark","post-light");
            });
            var see_likes = qsA("#see-likes");
            see_likes.forEach(function(element){
                element.style.filter = 'invert(0)';
            });
            var comments = qsA('.form-comm');
            comments.forEach(function(element){
                element.style.backgroundColor = 'rgb(13 87 151 / 65%)';
            });
        }
    })

    // Slow the background weather widget video and change it depending if its day or night
    var video = document.getElementById("back-weather"); 
    video.playbackRate = 0.5;
    var isday = document.getElementById("is_day");
    if(isday.innerHTML != "Day"){
        video.style.filter = "blur(0px)";
    } else{
        video.style.filter = "blur(5px)";
    }

    // Right top dropdown menú
    $(".dropdown-toggle").click(function(){
        if($(".dropdown-menu").is(':visible')){
            $(".dropdown-menu").slideUp('fast');
        }else if($(".dropdown-menu").is(':hidden')){
                $(".dropdown-menu").slideDown('fast');
        }
    })



    $("#home").click(function(){
        $(location).attr('href','welcome.php');
    });

    $("#explore").click(function(){
        $(location).attr('href','explore.php');
    });

    // Scroll to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('a.scroll-top').fadeIn('slow');
        } else {
            $('a.scroll-top').fadeOut('slow');
        }
    });
    $('a.scroll-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0});
    });


    const input = document.querySelector("input#image");
    const output = document.querySelector("output");
    let imagesArray = [];

    input.addEventListener("change", () => {
        const file = input.files;

        for(let i=0; i<file.length && i<4; i++){
            imagesArray.push(file[i]);
        }
        displayImages();
        output.style.display = "block";
    });

    function displayImages() {
        let images = '<div style="padding: 20px;"><span style="margin-bottom: 15px;">Máximo 4 imágenes.</span><div class="output-images">';

        for(let i=0; i<imagesArray.length;i++){
            images += `<div class="output-image" draggable="true">
            <div style="background-image: url(${URL.createObjectURL(imagesArray[i])})"></div>
            <span style="cursor:pointer;" id="${i}">&times;</span>
            </div>`
        }

        images += "</div></div>"
        output.innerHTML = images;
        
        document.querySelectorAll('.output-image>span').forEach(item => {
            item.addEventListener('click', function(){
                //const file = input.files;
                const files = [...myFileList]
                console.log(files);
                let index = item.id;
                file.splice(index, 1);
                imagesArray.splice(index, 1);
                displayImages();
            })
        });
    }

        /* Variables */

        let filesList = [];
        const classDragOver = "drag-over";
        const fileInputMulti = document.querySelectorAll("input.form-control");
        // DEMO Preview
        let multiSelectorUniqPreview = '';


         // Returns the index of an Array of Files from its name. If there are multiple files with the same name, the last one will be returned.

        function getIndexOfFileList(name, list) {
            return list.reduce(
                (position, file, index) => (file.name === name ? index : position),
                -1
            );
        }


        // Returns a File in text.

        async function encodeFileToText(file) {
            return file.text().then((text) => {
                return text;
            });
        }

        // Returns an Array from the union of 2 Arrays of Files avoiding repetitions.

        async function getUniqFiles(newFiles, currentListFiles) {
            return new Promise((resolve) => {
                Promise.all(newFiles.map((inputFile) => encodeFileToText(inputFile))).then(
                    (inputFilesText) => {
                        // Check all the files to save
                        Promise.all(
                            currentListFiles.map((savedFile) => encodeFileToText(savedFile))
                        ).then((savedFilesText) => {
                            let newFileList = currentListFiles;
                            inputFilesText.forEach((inputFileText, index) => {
                                if (!savedFilesText.includes(inputFileText)) {
                                    newFileList = newFileList.concat(newFiles[index]);
                                }
                            });
                            resolve(newFileList);
                        });
                    }
                );
            });
        }
         
        function renderPreviews(currentFileList, target, inputFile) {
            target.textContent = "";
            currentFileList.forEach((file, index) => {
                multiSelectorUniqPreview.parentNode.style.display = 'block';
                const myLi = document.createElement("li");
                myLi.classList.add('output-image');
                myLi.style.backgroundImage = 'url('+URL.createObjectURL(file)+')';
                myLi.setAttribute("draggable", 'true');
                myLi.dataset.key = file.name;
                myLi.addEventListener("drop", eventDrop);
                myLi.addEventListener("dragover", eventDragOver);
                multiSelectorUniqPreview.style.display = 'flex';
                const myButtonRemove = document.createElement("span");
                myButtonRemove.classList.add('removeButton-inputImgs')
                myButtonRemove.textContent = "X";
                myButtonRemove.addEventListener("click", () => {
                    filesList = deleteArrayElementByIndex(currentFileList, index);
                    inputFile.files = arrayFilesToFileList(filesList);
                    if(inputFile.files.length<1){
                        document.getElementById('output-container').style.display = 'none';
                    }
                    return renderPreviews(filesList, multiSelectorUniqPreview, inputFile);
                });
                myLi.appendChild(myButtonRemove);
                target.appendChild(myLi);
            });
        }

        function deleteArrayElementByIndex(list, index) {
            return list.filter((item, itemIndex) => itemIndex !== index);
        }
        
        function arrayFilesToFileList(filesList) {
            return filesList.reduce(function (dataTransfer, file) {
                dataTransfer.items.add(file);
                return dataTransfer;
            }, new DataTransfer()).files;
        }
        
        function arraySwapIndex(firstIndex, secondIndex, list) {
            const tempList = list.slice();
            const tmpFirstPos = tempList[firstIndex];
            tempList[firstIndex] = tempList[secondIndex];
            tempList[secondIndex] = tmpFirstPos;
            return tempList;
        }


        // Input file
        for (const input of fileInputMulti){
            input.addEventListener("input", async (event) => {
                if(event.target.classList.contains("img-edit")){
                    multiSelectorUniqPreview = document.getElementById("edit-output");
                    let count_images = $("#edit-existing-images>div").length;
                    let dt = new DataTransfer();
                    switch (count_images) {
                        case 5:
                            input.files = dt.files;
                            break;
                        
                        case 4:
                            for(let i=0; i<1; i++){
                                console.log(input.files);
                                dt.items.add(input.files[i]);
                            }
                            input.files = dt.files;
                            break;
                        case 3:
                            for(let i=0; i<2; i++){
                                if(input.files[i] != undefined){
                                    dt.items.add(input.files[i]);
                                }
                            }
                            input.files = dt.files;
                            break;
                        case 2: 
                            for(let i=0; i<3; i++){
                                if(input.files[i] != undefined){
                                    dt.items.add(input.files[i]);
                                }
                            }
                            input.files = dt.files;
                            break;
                    }
                } else{
                    multiSelectorUniqPreview = document.getElementById("post-output");
                }
                // Get files list from <input>
                const newFilesList = Array.from(input.files);
                // Update list files
                filesList = await getUniqFiles(newFilesList, filesList);
                // Only DEMO. Redraw
                renderPreviews(filesList, multiSelectorUniqPreview, input);
                // Set data to input
                input.files = arrayFilesToFileList(filesList);
            });
        }

        // Drag and drop

        // Drag Start - Moving element.
        let myDragElement = undefined;
        document.addEventListener("dragstart", (event) => {
            // Saves which element is moving.
            myDragElement = event.target;
        });

        // Drag over - Element that is below the element that is moving.
        function eventDragOver(event) {
            // Remove from all elements the class that will show that it is a drop zone.
            event.preventDefault();
            multiSelectorUniqPreview
                .querySelectorAll("li")
                .forEach((item) => item.classList.remove(classDragOver));

            // On the element above it, the class is added to show that it is a drop zone.
            event.target.classList.add(classDragOver);
        }

        // Drop - Element on which it is dropped.
        function eventDrop(event) {
            // The element that is underneath the element that is moving when it is released is captured.
            const myDropElement = event.target;
            // The positions of the elements in the array are swapped. The dataset key is used as an index.
            filesList = arraySwapIndex(
                getIndexOfFileList(myDragElement.dataset.key, filesList),
                getIndexOfFileList(myDropElement.dataset.key, filesList),
                filesList
            );
            // The content of the input file is updated.
            fileInputMulti.files = arrayFilesToFileList(filesList);
            // Only DEMO. Changes are redrawn.
            renderPreviews(filesList, multiSelectorUniqPreview, fileInputMulti);
        }

        
        let slideIndex = 1;
        showSlides(slideIndex);

        function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
        }


        $(".prev").click(function(){
            let index = $(".numbertext").text().split(" ")[0];
            let total = $(".numbertext").text().split(" ")[2];
            if(index > 1){
                $(".slide"+index).removeClass("slide-active");
                $(".slide"+(index-1)).addClass("slide-active");
                $(".numbertext").text((index-1)+" / "+total);
            }
        });

        $(".next").click(function(){
            let index = parseInt($(".numbertext").text().split(" ")[0]);
            console.log(index+1);
            let total = $(".numbertext").text().split(" ")[2];
            if(index < total){
                $(".slide"+index).removeClass("slide-active");
                $(".slide"+(index + 1)).addClass("slide-active");
                $(".numbertext").text((index+1)+" / "+total);
            }
        });

        if($("#content").val().length == 0){
            $("#post-submit").prop("disabled", true);
        }

        $("#content").on("input",function(){
            if($(this).val().length > 0){
                $("#max-content").css("display", "block");
                $("#max-content").text($(this).val().length+" / 280");
                $("#post-submit").prop("disabled", false);
                if($(this).val().length > 260){
                    $("#max-content").css("color", "red");
                    if($(this).val().length > 280){
                        $("#post-submit").prop("disabled", true);
                    } else{
                        $("#post-submit").prop("disabled", false);
                    }
                } else {
                    $("#max-content").css("color", "white");
                }
            } else if ($(this).val().length == 0) {
                $("#max-content").css("display", "none");
                $("#post-submit").prop("disabled", true);
            }
        })

        $("#url-post").on("click", function(){
            $("#add_url").attr("data-type","post");
            $("#add_url").modal({
                escapeClose: false,
                showClose: false
            });
        })

        $("#confirmar-url-modal").on("click", function(){
            let type = $("#add_url").attr('data-type');
            let text = "";
            let url = "";

            $(this).parent().parent().find("input").each(function(){
                if(this.name == "texto"){
                    text = this.value;
                } else{
                    url = this.value;
                }
            });

            if(type == "post"){
                let val = $("input#content").val();
                $("input#content").val(val+" [url="+url+"]"+text+"[/url]");
                $.modal.close();
            } else if(type == "comment"){
                let post_id = $("#add_url").attr('data-id');
                let input = $("#"+post_id).next().find('input#content');
                let val = input.val();
                input.val(val+" [url="+url+"]"+text+"[/url]");
                $.modal.close();
                $("#add_url input").each(function(){
                    $(this).val("");
                })
            }
        })

        $("#cerrar-url-modal").click(function(){
            $("#add_url").removeAttr("data-type");
            $("#add_url").removeAttr("data-id");
            $("#add_url input").each(function(){
                $(this).val("");
            })
            $.modal.close();
        });

        $(document).on("click", ".edit-post-button", function () {
            let post_id = $(this).parent().parent().parent()[0].id;
            let input = $("#edit-post input[type='file']");
            console.log(input[0].files);
            $.ajax("controllers/posts.php?type=unique", {
                type: 'POST',
                dataType: 'text',
                data: {'post_id' : post_id}
            }).then(function(respuesta){
                respuesta = JSON.parse(respuesta);
                let post_content = respuesta[0]['content'];
                $("#text-edit-post").val(post_content);
                let count_images = 0;
                $("#edit-existing-images>div").remove();
                $("#edit-existing-images").removeAttr('class');

                if(respuesta[0]['image'].length > 0){
                    images = [respuesta[0]['image'], respuesta[0]['image2'], respuesta[0]['image3'], respuesta[0]['image4']];
                    for(let image of images){
                        if(image.length>0){
                            $("#edit-existing-images").append("<div style='background-image: url("+image+")'></div>")
                            count_images++
                        }
                    }
                }

                $("#edit-existing-images").append("<div id='output-container' style='display:none; padding:0px 15px;'><output id='edit-output'></output></div>");
                $("#edit-post span")[0].innerText = "Introduce hasta "+(4-count_images)+" imágen/es mas.";
                let last = $("#edit-existing-images").children().last();
                switch (count_images) {
                    case 4:
                        $("#edit-existing-images").addClass('grid4');
                        $("#edit-existing-images>div").addClass('grid4-img');
                        break;
                    case 3:
                        $("#edit-existing-images").addClass('grid3');
                        $("#edit-existing-images>div").addClass('grid3-img');
                        console.log($("#edit-existing-images:lastChild"));
                        last.addClass('grid3-imgbot');
                        break;
                    case 2:
                        $("#edit-existing-images").addClass('grid3');
                        $("#edit-existing-images>div").addClass('grid2-img');
                        last.addClass('grid3-imgbot');
                        break;
                    case 1:
                        $("#edit-existing-images").addClass('grid3');
                        $("#edit-existing-images>div").addClass('grid1-img');
                        last.addClass('grid3-imgbot');
                        break;
                }
            })
    
        if($("#edit-post>span")){
            $("#edit-post>span").remove();
        }

        $("#edit-post").append("<span style='display:none;' value='"+post_id+"' />")
        $("#edit-post").modal({
            escapeClose: false,
            showClose: false,
            clickClose: false
        });
        });

        $("img.url-comment").on("click", function(){
            $("#add_url").attr("data-type","comment");
            console.log('click');
            let post_id = $(this).parent().parent().parent().parent().parent().prev('div')[0].id;
            $("#add_url").attr("data-id",post_id);
            $("#add_url").modal({
                escapeClose: false,
                showClose: false,
                clickClose: false
            });
        })

        $("img#ubicacion-post").on("click", function(){
            $("#ubicacion-modal").modal({
                escapeClose: false,
                showClose: false,
                clickClose: false
            });
        })

        $("#insert-coords").on("click", function(){
            if($("#lugar").val() == ''){
                if($("#longitud").val() != '' && $("#latitude").val() != ''){
                    if($("#map").children().length > 0){
                        $("#map").children().remove();
                    }

                    $("#map").append('<div style="position:relative;"><iframe width="800" height="400" style="border:0; border-radius: 5px;"loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCltQyssN-m8du_s3jHNjo3OjOar66Xg_s&q='+$("#latitude").val()+','+$("#longitud").val()+'"></iframe></div>');
                    $("#map>div").append("<div id='map-off' class='map-off'>X</div>")
                    $("#map").show();
                    $("input#input-map").val($("#latitude").val()+','+$("#longitud").val());
                    $("input#image").prop("disabled", true);
                    $("img#ico-images").css("cursor","not-allowed");
                    $("#longitud").val() = '';
                    $("#latitude").val() = '';
                    $.modal.close();

                    $("div#map-off").on('click', function(){
                        $("#map").children().remove();
                        $("#map").hide();
                        $("input#input-map").val('');
                        $("input#image").prop("disabled", false);
                        $("img#ico-images").css("cursor","pointer");
                        console.log($("input#input-map").val());
                    })
                }            
            } else{

                if($("#map").children().length > 0){
                    $("#map").children().remove();
                }

                $("#map").append('<div style="position: relative;"><iframe width="800" height="400" style="border:0; border-radius: 5px;"loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCltQyssN-m8du_s3jHNjo3OjOar66Xg_s&q='+$("#lugar").val()+'"></iframe></div>');
                $("#map>div").append("<div id='map-off' class='map-off'>X</div>")
                $("#map").show();
                $("input#input-map").val($("#lugar").val());
                $("input#image").prop("disabled", true);
                $("img#ico-images").css("cursor","not-allowed");
                $("input#lugar").val('');
                $.modal.close();

                $("div#map-off").on('click', function(){
                    $("#map").children().remove();
                    $("#map").hide();
                    $("input#input-map").val('');
                    $("input#image").prop("disabled", false);
                    $("img#ico-images").css("cursor","pointer");
                    console.log($("input#input-map").val());
                })
            }
        });

        $("#detect-ubic").on("click", function(){
            if (!"geolocation" in navigator){
                console.log("Tu navegador no soporta la autodetección de tu ubicación.");
            } else{
                const onUbicacionConcedida = ubicacion => {
                    if($("#map").children().length > 0){
                        $("#map").children().remove();
                    }
                    console.log("Tengo la ubicación: ", ubicacion.coords);
                    $("#map").append('<div style="position:relative;"><iframe width="800" height="400" style="border:0; border-radius: 5px;" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCltQyssN-m8du_s3jHNjo3OjOar66Xg_s&q='+ubicacion.coords['latitude']+','+ubicacion.coords['longitude']+'"></iframe></div>');
                    $("#map>div").append("<div id='map-off' class='map-off'>X</div>")
                    $("#map").show();
                    $("input#input-map").val(ubicacion.coords['latitude']+','+ubicacion.coords['longitude']);
                    $("input#image").prop("disabled", true);
                    $("img#ico-images").css("cursor","not-allowed");
                    $.modal.close();

                    $("div#map-off").on('click', function(){
                        $("#map").children().remove();
                        $("#map").hide();
                        $("input#input-map").val('');
                        $("input#image").prop("disabled", false);
                        $("img#ico-images").css("cursor","pointer");
                        console.log($("input#input-map").val());
                    })
                }
                const onErrorDeUbicacion = err => {
                    console.log("Error obteniendo ubicación: ", err);
                }
                const opcionesDeSolicitud = {
                    enableHighAccuracy: true, // Alta precisión
                    maximumAge: 0, // No queremos caché
                    timeout: 5000 // Esperar solo 5 segundos
                };
                // Solicitar
                navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
            }
        });

        $("#cerrar-ubic-modal").click(function(){
            $.modal.close();
        });
}