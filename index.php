<?php
    require __DIR__ . "/model.php";
?>
<!DOCTYPE html>
<html>
<head>
  <title>Requestum store</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  

</head>
<body class="store">

  <section class="main-list" id="appList">
    <div class="container">
      <div class="row place-for-items">

        <?php foreach (getItems(1, 2) as $item): ?>
                    <div class="col-xl-3 col-sm-6 item-container">
                      <div class="item">
                        <div class="item-image">
                          <img src="<?php echo $item['img']; ?>" alt="<?php echo $item['title']; ?>">
                        </div>
                        <?php if ($item['discountCost'] !== null): ?>
                            <div class="label sale">Sale</div>
                        <?php endif; ?>
                        <?php if ($item['new']): ?>
                            <div class="label new">New</div>
                        <?php endif; ?>

                        <h2><?php echo $item['title']; ?></h2>
                        <div class="item-describe"><?php echo $item['description']; ?></div>
                        <div class="item-prices">
                            <span class="current-price">$<?php echo $item['discountCost'] ? $item['discountCost'] : $item['cost']; ?></span> 
                            <?php if ($item['discountCost'] !== null): ?>
                            <span class="old-price">$<?php echo $item['cost']; ?></span>
                             <?php endif; ?>
                        </div>
                        <div class="item-actions d-flex justify-content-between">
                            <button class="btn btn-add">add to cart</button> <button class="btn btn-view">View</button>
                        </div>
                      </div>
                    </div>


        <?php endforeach; ?>


             
      </div>
    </div>

    <div class="text-center mb-5 load-more-button">
      <button class="btn btn-load-more" id="load-more-button">load more</button>
    </div>
    
  </section>
  <section class="hot-offers"> 
    <div class="container">
      <div class="row" >    
        <div class="col-xl-4 col-md-12 mb-4"> 
        <div class="hot-offer-block"> 
          <h3>hot offers</h3>
          <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue.</p>
          
          <ul>  
            <li>Vestibulum ante ipsum primis in faucibus orci luctus</li>
            <li>Nam elit magna hendrerit sit amet tincidunt ac</li>
            <li>Quisque diam lorem interdum vitae dapibus ac scele</li>
            <li>Donec eget tellus non erat lacinia fermentum</li>
            <li>Donec in velit vel ipsum auctor pulvin            </li>
          </ul>
          
        </div>
        </div>
        <div class="col-xl-4 col-md-12 mb-4"> 
        <div class="hot-offer-block"> 
          <h3>hot offers</h3>
          <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue.</p>
          
          <ul>  
            <li>Vestibulum ante ipsum primis in faucibus orci luctus</li>
            <li>Nam elit magna hendrerit sit amet tincidunt ac</li>
            <li>Quisque diam lorem interdum vitae dapibus ac scele</li>
            <li>Donec eget tellus non erat lacinia fermentum</li>
            <li>Donec in velit vel ipsum auctor pulvin            </li>
          </ul>
          
        </div>
        </div>
        <div class="col-xl-4 col-md-12 mb-4"> 
        <div class="hot-offer-block store"> 
          <h3>Store information</h3>
          <div class="company-detailes mb-4">
            <div class="d-flex align-items-center">

            <div class="icon"><p><i class="fas fa-map-marker-alt"></i></p></div>
            <div><p>Company Inc., 8901 Marmora Road, Glasgow, D04 89GR</p></div>
          </div>
          </div> 
          <div class="company-detailes mb-4">
            <div class="d-flex align-items-center">

            <div class="icon"><p><i class="fas fa-phone"></i></p></div>
            <div><p>Call us now toll free: (800) 2345-6789</p></div>
          </div>
          </div> 
          <div class="company-detailes mb-4">
            <div class="d-flex align-items-center">

            <div class="icon"><p><i class="far fa-envelope"></i></p></div>
            <div><p>Customer support: support@example.com
                                  <br>Press: pressroom@example.com</p>
            </div>
            </div>
            
          </div>
          <div class="company-detailes mb-4">
            <div class="d-flex align-items-center">

            <div class="icon"><p><i class="fab fa-skype"></i></p></div>
            <div><p>Skype: sample-username</p></div>
          </div>
          </div> 
        </div>      
        </div>      
      </div>
    </div>
  </section>
  <footer>
    
  </footer>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500" rel="stylesheet"> 
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="public/style.css">

  <script src="public/main.js"></script>

</body>
</html>
