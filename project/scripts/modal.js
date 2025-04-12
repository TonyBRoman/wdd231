export function setupModals() {
    const btns = document.querySelectorAll(".more-info-btn");

    btns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest("article");
            const name = card.querySelector("h3").textContent;
            const desc = card.querySelector("p").textContent;
            const img = card.querySelector("img").src;

            fetch("data/cats.json")
                .then(res => res.json())
                .then(cats => {
                    const catData = cats.find(cat => cat.name === name);
                    if (!catData) return;

                    const hobbiesList = catData.hobbies.map(hobby => `<li>${hobby}</li>`).join("");
                    const vaccinesList = catData.vaccines.map(vaccine => `<li>${vaccine}</li>`).join("");

                    const modal = document.createElement("div");
                    modal.classList.add("modal");
                    modal.innerHTML = `
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img src="${img}" alt="${name}">
                            <h3>${name}</h3>
                            <p>${desc}</p>
                            <h4>Hobbies:</h4>
                            <ul>${hobbiesList}</ul>
                            <h4>Vaccines:</h4>
                            <ul>${vaccinesList}</ul>
                            <a href="${catData.adoptionLink}" class="btn">Adopt ${name}</a>
                        </div>
                    `;

                    document.body.appendChild(modal);

                    modal.querySelector(".close").addEventListener("click", () => {
                        modal.remove();
                    });

                    modal.addEventListener("click", (event) => {
                        if (event.target === modal) {
                            modal.remove();
                        }
                    });
                });
        });
    });
}
