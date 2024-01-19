$(function() {
	var typingMessage = {

		messages: [
			'software engineer,'
		],
		counterStart: 0,
		counterLetter: 0,
		deleteStarted: false,

		initialize: function() {
			this.cacheElements();
			this.startTyping();
		},

		cacheElements: function() {
			this.$displayText = $('.text');
		},

		startTyping: function() {
			var currentMessage = this.messages[this.counterStart],
				  self          = this,
				  typingSpeed   = 0;

            // Check if the current message is "____" and stop deleting
			if (this.messages[this.counterStart] === 'Welcome ' && this.counterLetter >= currentMessage.length - 1 && !this.deleteStarted) {
				this.deleteStarted = true;
                setTimeout(function () {
                    self.hideTypingCursor(); // Call the function to hide the cursor after a delay
                  }, 2700);
				return;
			}

			currentMessage = !this.deleteStarted ? currentMessage.slice(0, ++this.counterLetter) : currentMessage.slice(0, --this.counterLetter);
			if(this.messages[this.counterStart] != currentMessage && !this.deleteStarted) {
				this.$displayText.text(currentMessage);
				typingSpeed = 90;
			}
			else {
				this.deleteStarted = true;
				typingSpeed = this.messages[this.counterStart] == currentMessage ? 1000 : 60;
				this.$displayText.text(currentMessage);
				if (currentMessage == '') {
					this.deleteStarted = false;
					this.counterStart = this.counterStart < this.messages.length - 1 ? this.counterStart + 1 : 0;
				}
			}
			setTimeout(function(){self.startTyping()}, typingSpeed);
		},
            hideTypingCursor: function () {
          // Hide the cursor
          $('.cursor').css('visibility', 'hidden');
        },
      };
	typingMessage.initialize();

	function glitchAnimation() {
        const glitchText = $('.glitch');
        const tl = gsap.timeline();

        tl.to(glitchText, { duration: 0.1, scaleX: 1.1, skewX: '15deg', ease: 'power1.inOut' })
            .to(glitchText, { duration: 0.1, scaleX: 1, skewX: '0deg', ease: 'power1.inOut' })
            .to(glitchText, { duration: 0.2, x: () => Math.random() * 10 - 5, ease: 'power1.inOut' })
            .to(glitchText, { duration: 0.2, x: 0, ease: 'power1.inOut' });

        return tl;
    }

    // Repeat ???
    setInterval(function() {
        glitchAnimation();
    }, 4000);
	setTimeout(glitchAnimation, 250);
	setTimeout(glitchAnimation, 250);
	setTimeout(glitchAnimation, 250);
	setTimeout(glitchAnimation, 250);
});
