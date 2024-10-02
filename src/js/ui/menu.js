function toggleContent(element) {
    var content = element.nextElementSibling;
    var icon = element.querySelector('.toggle-icon');

    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        // Collapse content
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        content.style.paddingTop = '0';  // Animate padding back to 0
        icon.innerHTML = '<i class="fa fa-angle-up" aria-hidden="true"></i>';
    } else {
        // Expand content
        content.style.maxHeight = content.scrollHeight + 'px'; // Dynamic height
        content.style.opacity = '1';
        content.style.paddingTop = '10px'; // Animate padding-top to 10px
        icon.innerHTML = '<i class="fa fa-angle-down" aria-hidden="true"></i>';
    }
}