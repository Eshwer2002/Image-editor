const fileInput = document.querySelector(".file");
const chooseImgBtn = document.querySelector(".choose-img");
const previewImg = document.querySelector(".preview-img img");
const filterOptions = document.querySelectorAll(".filter .options button");
const filterName = document.querySelector(".info .name");
const filterSlider = document.querySelector(".slider input");
const filterValue = document.querySelector(".slider .info .value");
const rotateOptions = document.querySelectorAll(".rotate .options button");
const resetFilterBtn = document.querySelector(".reset");
const saveImgBtn = document.querySelector(".save-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0, rotate = 0, flipHorizontal = 1, flipVertical = 1;




chooseImgBtn.addEventListener("click", ()=> fileInput.click());

const loadImg = ()=>{
    let file = fileInput.files[0];
    console.log(file);
    if (!file){
        return;
    }
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}
fileInput.addEventListener("change", loadImg);



filterOptions.forEach(option => {
    option.addEventListener("click", ()=>{
        document.querySelector(".filter .options .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerHTML = option.innerHTML;

        switch (option.innerHTML){
            case "Brightness":
                filterSlider.value = brightness;
                filterValue.innerHTML = brightness + "%";
                break;
            case "Inversion":
                filterSlider.value = inversion;
                filterValue.innerHTML = inversion + "%";
                break;
            case "Saturation":
                filterSlider.value = saturation;
                filterValue.innerHTML = saturation + "%";
                break;
            case "GrayScale":
                filterSlider.value = grayscale;
                filterValue.innerHTML = grayscale + "%";
            break;
        };
    });
});

const apply = ()=> {
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    
}; 

const update = () => {
    filterValue.innerHTML= filterSlider.value + "%";
    const selectedFilter = document.querySelector(".filter .active").innerHTML;

    switch (selectedFilter){
        case "Brightness":
            brightness = filterSlider.value;
            break;
        case "Inversion":
            inversion = filterSlider.value;
            break;
        case "Saturation":
            saturation = filterSlider.value;
            break;
        case "GrayScale":
            grayscale = filterSlider.value;
        break;
    };
    apply();
}
filterSlider.addEventListener("input", update);


rotateOptions.forEach(option => {
    option.addEventListener("click", ()=> {
        switch(option.id){
            case "left":
                rotate -= 90;
                break;
            case "right":
                rotate += 90;
                break;
            case "horizontal":
                flipHorizontal = flipHorizontal === 1 ? -1 : 1;
                break;
            case "vertical":
                flipVertical = flipVertical === 1 ? -1 : 1;
            break;
        }
        apply();
    })
});

const reset = () => {
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0, rotate = 0, flipHorizontal = 1, flipVertical = 1;
    filterOptions[0].click();
    apply();
}
resetFilterBtn.addEventListener("click", reset);


const save = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width/2, canvas.height/2);
    if (rotate!==0){
        ctx.rotate(rotate*Math.PI/180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2,  canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.jpeg";
    link.href = canvas.toDataURL();
    link.click();
}
saveImgBtn.addEventListener("click", save);