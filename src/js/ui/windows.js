function toggleContent(element) {
    var content = element.nextElementSibling;
    var icon = element.querySelector('.toggle-icon');

    if (content.style.display === 'block' || content.style.display === '') {
        content.style.display = 'none';
        icon.innerHTML = '<i class="fa fa-angle-up" aria-hidden="true"></i>';
    } else {
        content.style.display = 'block';
        icon.innerHTML = '<i class="fa fa-angle-down" aria-hidden="true"></i>';
    }

    content.classList.toggle('hidden-content');
}