module.exports = function check(str, bracketsConfig) {
    const strArray = str.split("");
    const openBrackets = [];
    const closeBrackets = [];
    bracketsConfig.forEach((rule) => {
        openBrackets.push(rule[0]);
        closeBrackets.push(rule[1]);
    });
    const stack = [];
    const isValid = !strArray.some((char) => {
        const isOpenUnlikeClose =
            openBrackets.includes(char) &&
            openBrackets.includes(char) !== closeBrackets.includes(char);
        const isOpenLikeClose =
            openBrackets.includes(char) &&
            openBrackets.includes(char) === closeBrackets.includes(char);
        const isStackIncludeOpen = stack.includes(openBrackets.indexOf(char));
        if (isOpenUnlikeClose || (isOpenLikeClose && !isStackIncludeOpen)) {
            stack.push(openBrackets.indexOf(char));
        } else if (closeBrackets.includes(char)) {
            if (
                stack &&
                stack[stack.length - 1] === closeBrackets.indexOf(char)
            ) {
                stack.pop();
            } else {
                return true;
            }
        }
    });

    return stack.length === 0 && isValid;
};
