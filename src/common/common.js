function checkNull(data) {
    return data != "" && data != undefined && data != null;
}

const patterns = {
    image: /(.*?)\.(jpg|jpeg|png|bmp|jfif)$/,
    integer: /^-?(0|[1-9]\d*)?$/,
    removebmp: /(.*?)\.(jpg|jpeg|png|jfif)$/,
    basicType: /(.*?)\.(jpg|jpeg|png|JPG|JPEG|PNG)$/,
    allimage: /(.*?)\.(jpg|jpeg|png|pdf|msword|docx|doc|jfif)$/,
    fileImage: /(.*?)\.(jpg|jpeg|png|pdf|msword|docx|doc)$/,
    emailPattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    allowOnlyPlusValue: /^[0-9]\d*$/,
    decimalTwoDigitOnly: /^\d{0,1000}(\.\d{1,2})?$/, // allows plus value and two digit
    decimal: /^\-?(\d+\.?\d*|\d*\.?\d+)$/, // allows + or - values
    sixDigitInteger: /^[0-9]{6}$/,
    tenDigitInteger: /^[0-9]{10}$/,
    mobileNumber: /^[6,7,8,9]{1}[0-9]{9}$/,
    aadharNo: /^[0-9]{12}$/,
    alphaNumeric: /^[0-9a-zA-Z]+$/,
    lettersOnly: /^[A-Za-z]+$/, // ABCabcRtvd
    imageAndPdf: /(.*?)\.(jpg|jpeg|png|bmp|pdf)$/,
    removeWhitespace: /^[^ ][\w\W ]*[^ ]/,
    ifscCode: /^[A-Z]{4}[A-Z0-9]{7}$/,
    removeWSWLetter: /^\S$|^\S[\s\S]*\S$/,
    numberOnly: "^[0-9]*$",
    url: /^(https?:\/\/[a-zA-Z0-9_+%-]+(\.[a-zA-Z0-9+\_%-]+)*(:[0-9]{1,5})?(\/[a-zA-Z0-9+()?#~=&\._%-]*)*)?$/,
    date: /^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/,
    url1: /^(https?:\/\/[a-zA-Z0-9_+%-]+(\.[a-zA-Z0-9+\_%-]+)*(:[0-9]{1,5})?(\/[a-zA-Z0-9+()?#~=&\._%-]*)*)?$/,
    name: /^([a-zA-Z0-9]+\s?)*$/,
    yTube:
        /^(?:https?:\/\/)(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/))((\w|-){11})(?:\S+)?$/, //Embeded link only
    numberGreaterthan0: /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/,
    EmailandMobile: /^(?:\d{10}|\w?.+@\w+\.\w{2,3})$/,
    noDecimal: /^[1-9]\d*$/,
    panNumber: /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/,
    aadhaar: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
    gstNumber: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    utrNumber: /^[a-zA-Z0-9]{11}((?!.*[.:_-]{2})[a-zA-Z0-9.:_-]{0,30}[a-zA-Z0-9])?$/,
    accountNo: /^[0-9]{9,18}$/,
    OTP: /\b\d{6}\b/,
};


module.exports = { patterns, checkNull }