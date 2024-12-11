fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDiGmS389NU_Ghd9OwYdu2lBEqXeB5f8dE')
  .then(response => response.json())
  .then(data => {
    // Select the existing fontWrapper from the HTML
    const fontWrapper = document.querySelector('.fontWrapper');
    
    // Select existing elements from the HTML to update later
    const fontName = document.getElementById('fontName');
    const fontStyle = document.getElementById('fontStyle');
    const dropdown = document.getElementById('dropdown');
    const randomButton = document.getElementById('randomButton');

    console.log(data);

    // Populate dropdown with font categories
    const categories = ['All', 'sans-serif', 'serif', 'display', 'handwriting', 'monospace'];
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category === 'All' ? '' : category; // Empty string for "All" to include all fonts
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      dropdown.appendChild(option);
    });

    // Add event listener to randomize fonts based on dropdown selection
    randomButton.addEventListener('click', () => {
      const selectedCategory = dropdown.value; // Get selected category
      const filteredFonts = selectedCategory
        ? data.items.filter(item => item.category === selectedCategory)
        : data.items; // Include all fonts if "All" is selected

      if (filteredFonts.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredFonts.length);
        displayFont(filteredFonts[randomIndex]);
      } else {
        fontName.textContent = `No fonts found for category: ${selectedCategory}`;
        fontStyle.textContent = '';
      }
    });

    // Function to display font details and create a download link
    function displayFont(font) {
      // Update the Family name
      fontName.textContent = font.family;

      // Update the Category
      fontStyle.textContent = `Category: ${font.category}`;

      // Load the font dynamically
      const fontLink = document.createElement('link');
      fontLink.href = `https://fonts.googleapis.com/css2?family=${font.family.replace(/ /g, '+')}`;
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);

      // Apply the font to the font name
      fontName.style.fontFamily = font.family;

      // Check if a download div already exists, and remove it if it does
      let existingDownloadDiv = document.querySelector('.download');
      if (existingDownloadDiv) {
        existingDownloadDiv.remove();
      }

      // Create a new Download div
      const downloadDiv = document.createElement('div');
      downloadDiv.className = 'download';

      // Create a Download link
      const downloadLink = document.createElement('a');
      downloadLink.href = `https://fonts.google.com/specimen/${font.family.replace(/ /g, '+')}`;
      downloadLink.target = '_blank';
      downloadLink.textContent = 'Download this font';

      // Add the link to the download div
      downloadDiv.appendChild(downloadLink);

      // Append the download div inside the fontWrapper, after the fontStyle
      fontWrapper.appendChild(downloadDiv);
    }
  })
  .catch(error => console.error('Error fetching the fonts API:', error));
