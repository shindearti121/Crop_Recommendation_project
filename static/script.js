// ============================================
// SLIDER AND INPUT SYNCHRONIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Sync sliders with number inputs
    const sliders = document.querySelectorAll('.slider');
    const numberInputs = document.querySelectorAll('.number-input');
    
    sliders.forEach(slider => {
        const inputId = slider.id.replace('_slider', '');
        const numberInput = document.getElementById(inputId);
        
        if (numberInput) {
            // Update number input when slider changes
            slider.addEventListener('input', function() {
                numberInput.value = this.value;
                updateSliderColor(this);
            });
            
            // Update slider when number input changes
            numberInput.addEventListener('input', function() {
                const value = parseFloat(this.value);
                const min = parseFloat(this.min);
                const max = parseFloat(this.max);
                
                if (value < min) this.value = min;
                if (value > max) this.value = max;
                
                slider.value = this.value;
                updateSliderColor(slider);
            });
            
            // Validate on blur
            numberInput.addEventListener('blur', function() {
                const value = parseFloat(this.value);
                const min = parseFloat(this.min);
                const max = parseFloat(this.max);
                
                if (isNaN(value) || value < min) {
                    this.value = min;
                    slider.value = min;
                } else if (value > max) {
                    this.value = max;
                    slider.value = max;
                }
                updateSliderColor(slider);
            });
            
            // Initialize slider color
            updateSliderColor(slider);
        }
    });
    
    // Update slider color based on value
    function updateSliderColor(slider) {
        const value = parseFloat(slider.value);
        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);
        const percentage = ((value - min) / (max - min)) * 100;
        
        // Create gradient based on position
        slider.style.background = `linear-gradient(to right, 
            #4caf50 0%, 
            #4caf50 ${percentage}%, 
            #e0e0e0 ${percentage}%, 
            #e0e0e0 100%)`;
    }
    
    // ============================================
    // TOOLTIP FUNCTIONALITY
    // ============================================
    const tooltip = document.getElementById('tooltip');
    const infoIcons = document.querySelectorAll('.info-icon');
    
    infoIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            if (tooltipText) {
                showTooltip(e, tooltipText);
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        icon.addEventListener('mousemove', function(e) {
            if (tooltip.style.opacity === '1') {
                updateTooltipPosition(e);
            }
        });
    });
    
    function showTooltip(e, text) {
        tooltip.textContent = text;
        tooltip.style.opacity = '1';
        updateTooltipPosition(e);
    }
    
    function hideTooltip() {
        tooltip.style.opacity = '0';
    }
    
    function updateTooltipPosition(e) {
        const x = e.clientX + 10;
        const y = e.clientY + 10;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }
    
    // ============================================
    // FORM SUBMISSION ANIMATION
    // ============================================
    const form = document.getElementById('cropForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Show loading state
            btnText.textContent = 'Analyzing...';
            btnIcon.style.display = 'none';
            btnLoader.style.display = 'inline';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';
            
            // Scroll to results if they exist
            setTimeout(() => {
                const resultsSection = document.getElementById('resultsSection');
                if (resultsSection) {
                    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 500);
        });
    }
    
    // ============================================
    // SMOOTH SCROLL TO RESULTS
    // ============================================
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        // Animate confidence bars
        const confidenceBars = document.querySelectorAll('.confidence-fill');
        confidenceBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
        
        // Animate result cards
        const resultCards = document.querySelectorAll('.result-card, .crop-card');
        resultCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // ============================================
    // INPUT VALIDATION FEEDBACK
    // ============================================
    numberInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // ============================================
    // QUICK FILL BUTTONS (BONUS FEATURE)
    // ============================================
    // Add quick preset buttons for common scenarios
    const formCard = document.querySelector('.form-card');
    if (formCard && !document.querySelector('.preset-buttons')) {
        const presetSection = document.createElement('div');
        presetSection.className = 'preset-buttons';
        presetSection.innerHTML = `
            <p style="margin-bottom: 0.5rem; color: var(--text-medium); font-size: 0.9rem;">
                <strong>Quick Presets:</strong> Try these common scenarios
            </p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                <button type="button" class="preset-btn" data-preset="rice">🌾 Rice Field</button>
                <button type="button" class="preset-btn" data-preset="wheat">🌾 Wheat Field</button>
                <button type="button" class="preset-btn" data-preset="vegetable">🥬 Vegetable Garden</button>
                <button type="button" class="preset-btn" data-preset="fruit">🍎 Fruit Orchard</button>
            </div>
        `;
        formCard.insertBefore(presetSection, form);
        
        // Add preset button styles
        const style = document.createElement('style');
        style.textContent = `
            .preset-btn {
                padding: 0.5rem 1rem;
                background: var(--background-light);
                border: 2px solid var(--border-color);
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.85rem;
                transition: all 0.2s ease;
                color: var(--text-dark);
            }
            .preset-btn:hover {
                background: var(--primary-green);
                color: white;
                border-color: var(--primary-green);
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
        
        // Preset values
        const presets = {
            rice: { N: 90, P: 42, K: 43, temperature: 25, humidity: 82, ph: 6.5, rainfall: 220 },
            wheat: { N: 80, P: 50, K: 45, temperature: 22, humidity: 70, ph: 6.8, rainfall: 150 },
            vegetable: { N: 70, P: 45, K: 50, temperature: 24, humidity: 75, ph: 6.5, rainfall: 180 },
            fruit: { N: 60, P: 40, K: 55, temperature: 26, humidity: 70, ph: 6.2, rainfall: 200 }
        };
        
        // Handle preset button clicks
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const presetName = this.getAttribute('data-preset');
                const preset = presets[presetName];
                
                if (preset) {
                    Object.keys(preset).forEach(key => {
                        const slider = document.getElementById(key + '_slider');
                        const input = document.getElementById(key);
                        
                        if (slider && input) {
                            slider.value = preset[key];
                            input.value = preset[key];
                            updateSliderColor(slider);
                            
                            // Add animation
                            input.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                input.style.transform = 'scale(1)';
                            }, 200);
                        }
                    });
                    
                    // Show feedback
                    btn.textContent = '✓ Applied!';
                    btn.style.background = 'var(--primary-green)';
                    btn.style.color = 'white';
                    setTimeout(() => {
                        btn.textContent = btn.getAttribute('data-preset') === 'rice' ? '🌾 Rice Field' :
                                        btn.getAttribute('data-preset') === 'wheat' ? '🌾 Wheat Field' :
                                        btn.getAttribute('data-preset') === 'vegetable' ? '🥬 Vegetable Garden' :
                                        '🍎 Fruit Orchard';
                        btn.style.background = '';
                        btn.style.color = '';
                    }, 1500);
                }
            });
        });
    }
    
    // ============================================
    // ACCESSIBILITY IMPROVEMENTS
    // ============================================
    // Add keyboard navigation for sliders
    sliders.forEach(slider => {
        slider.addEventListener('keydown', function(e) {
            const step = parseFloat(this.step) || 1;
            const currentValue = parseFloat(this.value);
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault();
                this.value = Math.min(parseFloat(this.max), currentValue + step);
                this.dispatchEvent(new Event('input'));
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                e.preventDefault();
                this.value = Math.max(parseFloat(this.min), currentValue - step);
                this.dispatchEvent(new Event('input'));
            }
        });
    });
    
    // ============================================
    // PRINT-FRIENDLY RESULTS
    // ============================================
    // Add print button if results exist
    if (resultsSection) {
        const printBtn = document.createElement('button');
        printBtn.textContent = '🖨️ Print Results';
        printBtn.className = 'preset-btn';
        printBtn.style.marginTop = '1rem';
        printBtn.addEventListener('click', () => {
            window.print();
        });
        resultsSection.appendChild(printBtn);
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatNumber(num) {
    return parseFloat(num).toFixed(1);
}

// Add smooth reveal animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.result-card, .crop-card, .form-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
