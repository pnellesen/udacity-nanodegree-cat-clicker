$(function() {
	var catModel = {
		catData: [
     	  {url:"http://mentoringmoments.org/wp-content/uploads/2011/11/cat1-400x400.png",name:"Cat 1",clickCount:0},
     	  {url:"http://img2.timeinc.net/health/img/web/2013/03/slides/cat-allergies-400x400.jpg",name:"Allergy Cat",clickCount:0},
     	  {url:"http://img2.timeinc.net/health/img/web/2012/10/blogs/fat-cat-overweight-400x400.jpg",name:"Fat Cat",clickCount:0},
     	  {url:"http://healthnewsandviews.files.wordpress.com/2012/12/kitty-cat-400x400.jpg",name:"Kitty Cat",clickCount:0},
     	  {url:"http://fullyfeline.com/wp-content/uploads/2012/10/black-cat-5a-400x400.jpg",name:"Black Cat",clickCount:0}
     	],			
		init: function () {// Build our cat objects here
			for(var i=0;i<this.catData.length;i++) {
				if (!this.catData[i].id) this.catData[i].id=i;
			}
			
		},
		getCatById: function(catId) {
			for(var i=0;i<this.catData.length;i++) {
				if (this.catData[i].id == catId) return this.catData[i];
			}
		},
		getAllCats: function() {
			return this.catData;
		},
		increment: function(catId) {
			for(var i=0;i<this.catData.length;i++) {
				if (this.catData[i].id == catId) this.catData[i].clickCount++;
			}
		},
		reset: function(catId) {
			for(var i=0;i<this.catData.length;i++) {
				if (this.catData[i].id == catId) this.catData[i].clickCount = 0;
			}
		}
	};
	
	var catController = {
		init: function() {
			catModel.init();
			catListView.init();
			catView.init();
		},
		getCats: function() {
			return catModel.getAllCats();
			
		},
		drawCat: function(catId) {
			catView.render(catModel.getCatById(catId));
		},
		updateCatCounter: function(catId) {
			catModel.increment(catId);
			catView.updateCounter(catModel.getCatById(catId));
		},
		resetCatCounter: function(catId) {
			catModel.reset(catId);
			catView.updateCounter(catModel.getCatById(catId));
		}
		
	};
	
	var catView = {// view to handle the Cat image Div
		init: function() {
			//
		},
		render: function(thisCat) {
			var catDiv = '<div class="catClicker" id="cat' + thisCat.id + '"></div>';
			var catImg = '<div id="img' + thisCat.id + '" class="catImg" title="Click Me!"><img src="' + thisCat.url + '" width="400px" height="400px"/></div>';
			var counterDiv = '<h3>' + thisCat.name + ' clicked <span id="' + thisCat.id + 'counter"></span> times</h3>';
			var resetDiv = '<div class="catCountReset" id="reset' + thisCat.id + '"  title="Reset counter to 0">Reset</div>';
			$('#catContainer').html(catDiv);
			$('#cat' + thisCat.id).append(counterDiv);
			$('#cat' + thisCat.id).append(catImg);
			$('#cat' + thisCat.id).append(resetDiv);
			//$('#' + thisCat.id + 'counter').html(thisCat.clickCount);
			this.updateCounter(thisCat);
		},
		updateCounter: function(thisCat) {
			$('#' + thisCat.id + 'counter').html(thisCat.clickCount);
		}
	};
	
	var catListView = {// view to handle the dropdown list
		init: function() {
			this.render(catController.getCats());
			$('#catSelect').change(function() {
				var catIdx = $(this).find(":selected").val();
				catController.drawCat(catIdx);
			})
			$('.catContainer').on('click','.catImg',function() {
				var clickIdx = $('#catSelect option:selected').val();// kind of cheating, but it works ;)
				catController.updateCatCounter(clickIdx);
			});;
			$('.catContainer').on('click','.catCountReset',function() {
				var clickIdx = $('#catSelect option:selected').val();
				catController.resetCatCounter(clickIdx);
			});
		},
		render: function(catList) {
			for (var i = 0; i < catList.length; i++) {
				$('#catSelect').append('<option value="' + catList[i].id + '">' + catList[i].name + '</option>');
			}
		}
	}
	catController.init();
});