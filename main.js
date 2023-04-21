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
        qs(".mainframe").style.backgroundColor = "#17181c";
        qs(".whats-new").style.backgroundColor =  "#1e1f23";
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
        qs(".mainframe").style.backgroundColor = "white";
        qs(".whats-new").style.backgroundColor =  "#0160b157";
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
            qs(".mainframe").style.backgroundColor = "#17181c";
            qs(".whats-new").style.backgroundColor =  "#1e1f23";
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
            qs(".mainframe").style.backgroundColor = "white";
            qs(".whats-new").style.backgroundColor =  "#0160b157";
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
        const fileInputMulti = document.querySelector("input#image");
        // DEMO Preview
        const multiSelectorUniqPreview = document.querySelector("output");


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
                document.getElementById('output-container').style.display = 'block';
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
        fileInputMulti.addEventListener("input", async () => {
            // Get files list from <input>
            const newFilesList = Array.from(fileInputMulti.files);
            // Update list files
            filesList = await getUniqFiles(newFilesList, filesList);
            // Only DEMO. Redraw
            renderPreviews(filesList, multiSelectorUniqPreview, fileInputMulti);
            // Set data to input
            fileInputMulti.files = arrayFilesToFileList(filesList);
            console.log(fileInputMulti.files);
        });

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

        $("#content").on("input",function(){
            if($(this).val().length > 0){
                $("#max-content").css("display", "block");
                $("#max-content").text($(this).val().length+" / 280");
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
            }
        })
}