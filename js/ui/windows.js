function toggleContent(element) {
    var content = element.nextElementSibling;
    var icon = element.querySelector('.toggle-icon');

    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        icon.textContent = '▼';
    }

    content.classList.toggle('visible-content');
}