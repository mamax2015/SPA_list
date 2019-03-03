"use strict";

class ItemList{
    constructor(appId, page, perPage) {
        this.curPage = page;
        this.nextPage = this.curPage;
        this.perPage = perPage;
        this.appContainer = document.getElementById(appId);
        this.itemPlace = this.appContainer.querySelector('.place-for-items');
        this.lastItemsQuantityLoaded = perPage;
        this.itemsTotal = Infinity;
        this.gettingData = false;
        this.loadNextPageImmediately = false;
        this.init();        
    }

    init(){
        this.loadMoreButton = document.getElementById("loadMoreButton");
        const showItems = () => {
            this.showItems();
        }
        loadMoreButton.addEventListener("click", showItems);
        this.getItems();
    }

    getItems(){
        if(this.gettingData){
            this.loadNextPageImmediately = true;
            return false;
        }        

        if(!this.areThereMoreItems()){
            this.hideLoadMoreButton();
            return false;
        }else{
            this.nextPage += 1;
        }
        this.gettingData = true; 
        this.appendLoadings();

        fetch('/list.php?page=' + this.nextPage + '&per_page=' +  this.perPage ,{
            methos: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {      
            return response.json();
        }).then((items) => {

            this.gettingData = false;                        
            this.lastItemsQuantityLoaded = items.entities.length;
            this.itemsTotal = items.total;
            this.appendItems(items);
            if(this.loadNextPageImmediately){
                this.loadNextPageImmediately = false;
                this.getItems();
            }
        }).catch(() => {
            this.gettingData = false;
        });
    }

    appendItems(itemsObj){
        let items = itemsObj.entities;
        for( let i=0; i<items.length; i++){
            let itemMarkup = this.createItemLayout(items[i]);
            let placeForItem = this.itemPlace.querySelector(".item-container.loading");
            let itemHolder = placeForItem.querySelector(".item")
            itemHolder.insertAdjacentHTML('beforeend',itemMarkup);
            itemHolder.classList.remove("d-flex", "align-items-center", "text-center");
            let spiner = placeForItem.querySelector(".spiner-holder");
            this.opcityElement(spiner,'hide',spiner);
            let itemLoading = placeForItem.querySelector(".item-loading");
            this.opcityElement(itemLoading,'show');
            placeForItem.classList.remove("loading");

        }
        let loadingItemsExcessive = this.itemPlace.querySelectorAll(".item-container.loading");
        for(let i=0; i<loadingItemsExcessive.length; i++){
            loadingItemsExcessive[i].parentNode.removeChild(loadingItemsExcessive[i]);
        }

    }

    opcityElement(elem,action,eletTodelete){
      let opacityValue = parseInt(getComputedStyle(elem).opacity);
      let timer = setInterval(frame, 10);
      let step = -0.025;
      if(action === 'show'){
        step = 0.025;
      }
      function frame() {
        if (opacityValue <= 0 && action == 'hide' || opacityValue >= 1 && action == 'show') {
          clearInterval(timer);
          if(eletTodelete){
            eletTodelete.parentNode.removeChild(eletTodelete);            
          }
        } else {
          opacityValue = opacityValue + step;
          elem.style.opacity = opacityValue; 
        }
      }
    }
   

    createItemLayout(item){
        let saleLabel ='',
            newItemLabel ='',
            price = item.cost,
            oldPrice = '';
        if(!!item.new){
            newItemLabel = '<div class="label new">New</div>';
        }
        if(!!item.discountCost){
            saleLabel = '<div class="label sale">Sale</div>';
            price = item.discountCost;
            oldPrice = '<span class="old-price">$' + item.cost + '</span>'
        }

            
        return `
            <div class="item-loading">
                <div class="item-image">
                  <img src="${item.img}" alt="${item.title}">
                </div>
                ${newItemLabel}
                ${saleLabel}
                <h2>${item.title}</h2>
                <div class="item-describe">$${item.description}</div>
                <div class="item-prices">
                    <span class="current-price">$${price}</span> 
                    ${oldPrice}
                </div>
                <div class="item-actions d-flex justify-content-between">
                    <button class="btn btn-add">add to cart</button> <button class="btn btn-view">View</button>
                </div>
            </div>
        `;
    }

    appendLoadings(){
        let loadingMarkup;
        for( let i=0; i<this.perPage; i++){
            loadingMarkup = this.createLoadingLayout();
            this.itemPlace.insertAdjacentHTML('beforeend',loadingMarkup);
        }
    }
    createLoadingLayout(){
        return `<div class="col-xl-3 col-sm-6 item-container loading hidden" style="max-height:0px; opacity:0;">
          <div class="item d-flex align-items-center text-center">
            <div class="spiner-holder">
              <div class="spiner"><i class="fas fa-spinner fa-spin"></i></div>
            </div>
          </div>
        </div>`;        
    }

    showItems(){
        let appendedAndHiddenItems = this.itemPlace.querySelectorAll(".item-container.hidden");
        appendedAndHiddenItems.forEach(function(item) {
            item.style.maxHeight = "500px";            
            item.style.opacity = "1";            
            item.classList.remove("hidden");
        });        
        this.getItems();
    }

    areThereMoreItems(){
        if(this.lastItemsQuantityLoaded < this.perPage){
            return false;
        }
        if(this.curPage * this.perPage >= this.itemsTotal){
            return false;                
        }
        return true;
    }

    hideLoadMoreButton(){
        this.loadMoreButton.classList.add("d-none");
    }


}


let itemList = new ItemList("appList",1,2);

