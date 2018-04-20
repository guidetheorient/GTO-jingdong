    
    
    
    //1.获取窗口宽度，获取li的宽度，计算列数
    //2.声明放置每列高度的数组并初始化
    //3.获取数组最小值和下标，利用left，top定位li
    require('./index.scss');

    //假图片
    function getFakeImg(count){
      var html=''
      for(let i = 0;i < count;i++){
        var fakeHeight = Math.floor(Math.random()*3+1)
        html += '<li class="item"><img src="http://fakeimg.pl/200x'+fakeHeight+'00/?text='+(i+1)+'"></li>'
      }
      $('ul').append(html)  
    }

    var count = 10
    getFakeImg(count)
    
    var ctWidth = $('.ct').width()
    var nodeWidth = $('ul li.item').outerWidth(true)
    var column = parseInt(ctWidth/nodeWidth)

    var heightArr = []
    for(let i = 0;i < column;i++){
      heightArr[i] = 0
    }

    //几个问题
    //1.从别处获取图片要判断图片是否加载完毕，on ‘load’是每次加载完都会执行，所以要么能判断指定序号加载然后排列，要么等全部加载完再排列
    //2.注意this
    //load快捷方式在3.0中被删除了
    var loadImgCount = 0
    $('ul').find('img').on('load',function(){
      loadImgCount++
      if( loadImgCount === count){
        $('.item').each(function(ele,elel){
        var minHeight = Math.min.apply(null, heightArr)
        var index = heightArr.indexOf(minHeight)
        $(this).css({
          left:nodeWidth*index,
          top:heightArr[index],
        })
        heightArr[index]+=$(this).outerHeight(true)
        })
      }else{
        console.log('error')
      }  
    })