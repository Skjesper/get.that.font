// Fetch fonts from Google Fonts API
fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDiGmS389NU_Ghd9OwYdu2lBEqXeB5f8dE')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // Populate dropdown menu with font categories
    const dropdown = document.getElementById('dropdown');
    const categories = ['All', 'sans-serif', 'serif', 'display', 'handwriting', 'monospace'];
 
    // Create and append options to dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        // Empty value for 'All' to show all fonts, otherwise use category name
        option.value = category === 'All' ? '' : category;
        // Capitalize first letter of category name
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        dropdown.appendChild(option);
    });

    // Set up random font selection functionality
    const randomButton = document.getElementById('randomButton');
    const fontName = document.getElementById('font-selection-name');
    const categoryName = document.getElementById('category-name');
    
    // Handle random font selection when button is clicked
    randomButton.addEventListener('click', () => {
        const selectedCategory = dropdown.value;
        // Filter fonts based on selected category, or use all fonts if no category selected
        const filteredFonts = selectedCategory
            ? data.items.filter(item => item.category === selectedCategory)
            : data.items;

        // Select and display random font from filtered list
        if (filteredFonts.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredFonts.length);
          displayfont(filteredFonts[randomIndex]);
        } else {
          fontName.textContent = `No fonts found for category: ${selectedCategory}`;
          categoryName.textContent = '';
        }
    });

    // Function to display the selected font
    function displayfont(font) {
      const fontName = document.getElementById('font-selection-name');
      const categoryName = document.getElementById('category-name');
      const downloadLink = document.getElementById('download-link');
      
      // Dynamically load the font using Google Fonts API
      const link = document.createElement('link');
      // Replace spaces with '+' in font family name for URL
      link.href = `https://fonts.googleapis.com/css?family=${font.family.replace(' ', '+')}&display=swap:100,200,300,400,500,600,700,800,900`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      // Update the display elements with font information
      fontName.textContent = `${font.family}`;
      categoryName.textContent = `${font.category}`;
      fontName.style.fontFamily = font.family;

      // Create download link using regular weight or first available file
      downloadLink.innerHTML = `<a href="${font.files.regular || Object.values(font.files)[0]}" target="_blank">download font</a>`;
    }
  })
  // Handle any errors during API fetch
  .catch(error => console.error('Error fetching the fonts API:', error));