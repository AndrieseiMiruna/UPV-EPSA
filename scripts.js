document.querySelectorAll(".contact__more").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector('.contact__actions').classList.add('contact__actions--active');
    document.querySelector('.contact__actions').dataset.id = button.dataset.id;
  });
});
