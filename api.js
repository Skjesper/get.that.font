fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDiGmS389NU_Ghd9OwYdu2lBEqXeB5f8dE')
  .then(response => response.json())
  .then(data => {


    
    console.log(data);

    // Dropdownmenu
    const dropdown = document.getElementById('dropdown');
    const categories = ['All', 'sans-serif', 'serif', 'display', 'handwriting', 'monospace'];
 
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category === 'All' ? '' : category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1); //Adds the actual text for the dropdown
        dropdown.appendChild(option); //Adds the value of the categories to the dropdown menu
    });

    //Randombutton eventlistener

    const randomButton = document.getElementById('randomButton')
    const fontName = document.getElementById('font-selection-name')
    const categoryName = document.getElementById('category-name')
    
    randomButton.addEventListener('click', () => {
        const selectedCategory = dropdown.value; 
        const filteredFonts = selectedCategory
            ? data.items.filter(item => item.category === selectedCategory)
            : data.items;

    // calculates what fonts that is randomized
        if (filteredFonts.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredFonts.length);
          displayfont(filteredFonts[randomIndex]);
        } else {
          fontName.textContent = `No fonts found for category: ${selectedCategory}`;
          categoryName.textContent = '';
        }


    });

    function displayfont(font) {
      const fontName = document.getElementById('font-selection-name');
      const categoryName = document.getElementById('category-name');
      const downloadLink = document.getElementById('download-link');
      
      // Load the font using Google Fonts API
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css?family=${font.family.replace(' ', '+')}&display=swap:100,200,300,400,500,600,700,800,900`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      // Update the display
      fontName.textContent = `${font.family}`;
      categoryName.textContent = `${font.category}`;
      fontName.style.fontFamily = font.family;

      downloadLink.innerHTML = `<a href="${font.files.regular || Object.values(font.files)[0]}" target="_blank">download font</a>`;
  }

  })
  .catch(error => console.error('Error fetching the fonts API:', error));
