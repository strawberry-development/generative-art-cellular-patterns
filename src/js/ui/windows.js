function toggleContent(element) {
    var content = element.nextElementSibling;
    var icon = element.querySelector('.toggle-icon');

    if (content.style.display === 'block' || content.style.display === '') {
        content.style.display = 'none';
        icon.textContent = '+';
    } else {
        content.style.display = 'block';
        icon.textContent = '-';
    }

    content.classList.toggle('hidden-content');
}