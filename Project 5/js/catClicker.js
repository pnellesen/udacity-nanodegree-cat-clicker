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
		updateCat: function(catId,catInfo) {
				// URGH! THIS IS DEFINITELY NOT THE BEST WAY TO DO THIS :P
				this.catData[catId].name = catInfo[0];
				this.catData[catId].url = catInfo[1];
				this.catData[catId].clickCount = catInfo[2];
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
			catAdminView.updateClickCount(catModel.getCatById(catId));
			
		},
		resetCatCounter: function(catId) {
			catModel.reset(catId);
			catView.updateCounter(catModel.getCatById(catId));
			catAdminView.updateClickCount(catModel.getCatById(catId));
		},
		showCatAdmin: function() {
			catAdminView.show();
		},
		hideCatAdmin: function() {
			catAdminView.hide();
		},
		setCatAdmin: function(catId) {
			catAdminView.populate(catModel.getCatById(catId));
		},
		updateCatInfo: function(catId) {
			var formInfo = catAdminView.getCatFormInfo();
			catModel.updateCat(catId,formInfo);
			catListView.updateListName(catModel.getCatById(catId))
			catView.render(catModel.getCatById(catId));
		}
		
	};
	
	var catAdminView = {// view to handle Cat Admin stuff
		populate: function(thisCat) {
			$('#catNameInput').val(thisCat.name);
			$('#catUrlInput').val(thisCat.url);
			$('#catClickInput').val(thisCat.clickCount);
		},
		show: function() {
			$('#catAdminForm').css('display','block');
		},
		hide: function() {
			$('#catAdminForm').css('display','none');
		},
		updateClickCount:function(thisCat) {
			$('#catClickInput').val(thisCat.clickCount);
		},
		getCatFormInfo: function() {
			var formInfo = [];
			formInfo.push($('#catNameInput').val());
			formInfo.push($('#catUrlInput').val());
			formInfo.push($('#catClickInput').val());
			return formInfo;
		}
	
	}
	
	var catView = {// view to handle the Cat image Div
		init: function() {
			//
		},
		render: function(thisCat) {
			$('#cat-name').html(thisCat.name);
			this.updateCounter(thisCat);
			$('#cat-image').attr('src',thisCat.url);
			$('.catCountReset').attr('id','reset' + thisCat.id);
		},
		updateCounter: function(thisCat) {
			$('#cat-click-count').html(thisCat.clickCount);
		}
	};
	
	var catListView = {// view to handle the dropdown list
		init: function() {
			this.render(catController.getCats());
			$('#catSelect').change(function() {
				var catIdx = $(this).find(":selected").val();
				catController.drawCat(catIdx);
				catController.setCatAdmin(catIdx);
			});
			$('.catContainer').on('click','.catImg',function() {
				var clickIdx = $('#catSelect option:selected').val();// kind of cheating, but it works ;)
				catController.updateCatCounter(clickIdx);
			});
			$('.catContainer').on('click','.catCountReset',function() {
				var clickIdx = $('#catSelect option:selected').val();
				catController.resetCatCounter(clickIdx);
			});
			
			$('#cat-admin').click(function() {
				var clickIdx = $('#catSelect option:selected').val();
				if ($('#catAdminForm').css('display') == 'none') {
					catController.showCatAdmin();
				} else {
					catController.hideCatAdmin();
				}
			});
			$('#catFormSave').click(function() {
				var clickIdx = $('#catSelect option:selected').val();
				catController.updateCatInfo(clickIdx);
			});
			
			
		},
		render: function(catList) {
			for (var i = 0; i < catList.length; i++) {
				$('#catSelect').append('<option value="' + catList[i].id + '">' + catList[i].name + '</option>');
			}
		},
		updateListName: function(thisCat) {
			$("#catSelect > option").each(function() {
				if (this.value == thisCat.id) {this.text = thisCat.name}
			});
		}
	}
	catController.init();
});