const apiKey = '2a342c4f';  // ← your OMDb key

const formEl    = document.getElementById('search-form');
const inputEl   = document.getElementById('search-input');
const resultsEl = document.getElementById('results');

// Round to nearest half
function roundToHalf(n) {
  return Math.round(n * 2) / 2;
}
// Build star icons
function renderStars(imdbRating) {
  const rating = parseFloat(imdbRating) || 0;
  const halfStars = roundToHalf(rating) / 2;
  const full = Math.floor(halfStars);
  const half = halfStars - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    '<span class="rating-stars">' +
      '<i class="bi bi-star-fill"></i>'.repeat(full) +
      (half ? '<i class="bi bi-star-half"></i>' : '') +
      '<i class="bi bi-star"></i>'.repeat(empty) +
    `</span> <small class="text-muted">(${roundToHalf(rating)})</small>`
  );
}

// Show 6 skeleton cards
function showLoading() {
  resultsEl.innerHTML = '';
  for (let i=0;i<6;i++) {
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="skeleton skeleton-img"></div>
        <div class="card-body">
          <div class="skeleton skeleton-text" style="width:60%;"></div>
          <div class="skeleton skeleton-text" style="width:40%;"></div>
          <div class="skeleton skeleton-text" style="width:80%;"></div>
        </div>
      </div>`;
    resultsEl.appendChild(col);
  }
}

// Fetch basic search, then detail for each, then render
async function doSearch() {
  const title = inputEl.value.trim();
  if (!title) return;
  showLoading();
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}&page=1`
    );
    const data = await res.json();
    if (data.Response !== 'True') {
      resultsEl.innerHTML = `<div class="col-12 text-center">
        <p class="text-danger fs-5">${data.Error}</p>
      </div>`;
      return;
    }

    // take first 6, fetch details in parallel
    const basic = data.Search.slice(0,6);
    const details = await Promise.all(
      basic.map(item =>
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${item.imdbID}`)
          .then(r=>r.json())
      )
    );

    // render
    resultsEl.innerHTML = '';
    details.forEach(m => {
      const col = document.createElement('div');
      col.className = 'col';
      col.innerHTML = `
        <div class="card h-100 shadow-sm clickable">
          <img
            src="${m.Poster!=='N/A'?m.Poster:'https://via.placeholder.com/300x450?text=No+Image'}"
            class="card-img-top"
            alt="${m.Title}"
            style="height:400px;object-fit:cover;"
          />
          <div class="card-body text-center d-flex flex-column">
            <h5 class="card-title">${m.Title}</h5>
            <div class="mb-1">${renderStars(m.imdbRating)}</div>
            <p class="card-text mb-2">${m.Year}</p>
            <span class="badge bg-primary text-capitalize">${m.Type}</span>
          </div>
        </div>`;
      resultsEl.appendChild(col);
    });

  } catch (err) {
    console.error(err);
    resultsEl.innerHTML = `<div class="col-12 text-center">
      <p class="text-danger fs-5">Error fetching data.</p>
    </div>`;
  }
}

// Bind form 
formEl.addEventListener('submit', e => { e.preventDefault(); doSearch(); });
inputEl.addEventListener('keyup', e => { if (e.key==='Enter') doSearch(); });

// Contact form 
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const n = document.getElementById('contact-name').value.trim(),
        em= document.getElementById('contact-email').value.trim(),
        msg= document.getElementById('contact-message').value.trim();
  window.location.href = `mailto:admin@mymoviedb.com`
    + `?subject=${encodeURIComponent('Contact from '+n)}`
    + `&body=${encodeURIComponent('Name: '+n+'%0AEmail: '+em+'%0A%0A'+msg)}`;
  bootstrap.Modal.getInstance(document.getElementById('contactModal')).hide();
});
