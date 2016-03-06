(function (global) {

	var dc = {};

	var resultUrl = "snippets/result-table.html";
	var resultRowUrl = "snippets/result-row.html";
	var devDataUrl = "dev-data/data.csv";
	var areasDataUrl = "dev-data/areas.txt";
	var langUrl = "lang/{{lang}}.txt";	
	var mainSelector = "#main";
	var textSelector = "#caption";


	// Convinience function for inserting innerHTML for 'select'
	var insertHtml = function (selector, html) {
	  var targetElem = document.querySelector(selector);
	  targetElem.innerHTML = html;
	};

	// Show loading icon inside element identified by 'selector'.
	var showLoading = function (selector) {
	  var html = "<div class='text-center'>";
	  html += "<img src='img/ajax-loader.gif'></div>";
	  insertHtml(selector, html);
	};

	// Return substitute of '{{propName}}' 
	// with propValue in given 'string' 
	var insertProperty = function (string, propName, propValue) {
	  var propToReplace = "{{" + propName + "}}";
	  string = string
	    .replace(new RegExp(propToReplace, "g"), propValue);
	  return string;
	}

	var axisLength = 200;
	var zeroPointDim = 10;
	var captionDeltaX = 80;
	var captionDeltaY = 50;
	var markPointDim = 20;

	var zeroX = document.querySelector(mainSelector).offsetWidth/2;
	var zeroY = document.querySelector(mainSelector).offsetHeight/2;

	var makeElement = function(id, elType, appendToSelector, pointClass, pointLeft, pointTop, pointWidth, pointHeight){
	
		var point = document.createElement(elType);
		point.id = id;
		point.className=pointClass;
		point.style.left = pointLeft+"px";
		point.style.top = pointTop+"px";
		point.style.width = pointWidth+"px";
		point.style.height = pointHeight+"px";
		document.querySelector(appendToSelector).appendChild(point);

		return point;

	}

	

	document.addEventListener("DOMContentLoaded", function (event) {
	  	var lang = "en";
		showLoading(textSelector);
		getDevData(123456, lang);


	});

	function getDevData(id, lang){

			  	var langUrl1 = insertProperty(langUrl, "lang", lang); 
				$ajaxUtils.sendGetRequest(
				  langUrl1, 
				  function(local){
				  	$ajaxUtils.sendGetRequest(
				  		resultUrl, 
				  		function(titles){
				  			var txt = titles;

					  		txt = insertProperty(txt, "caption-result", local.result);
					  		txt = insertProperty(txt, "caption-company", local.company);
					  		txt = insertProperty(txt, "caption-name", local.name);
					  		txt = insertProperty(txt, "caption-date", local.date);
					  		txt = insertProperty(txt, "caption-area", local.area);
					  		txt = insertProperty(txt, "caption-score", local.score);			


									  	$ajaxUtils.sendGetRequest(
									  		areasDataUrl,
									  		function(res){
									  			


												for(var i=0;i<res.areas.length;i++){
													var newDivContainer = makeElement(res.areas[i], "div", mainSelector, "", 0, 0, "100%", "100%");
													newDivLeft = (zeroX-axisLength/2+axisLength*Math.cos(-Math.PI*2*i/res.areas.length)/2);
													newDivTop = (zeroY+axisLength*Math.sin(-Math.PI*2*i/res.areas.length)/2);	
													var newDiv = makeElement("", "div", "#"+res.areas[i], "axis", newDivLeft, newDivTop, axisLength, 0);
													newDiv.style.transform = "rotate("+(-360*i/res.areas.length)+"deg)";

													for(var j=res.minGrade+2;j<=res.maxGrade;j=j+2){
														var delta = (axisLength)/(res.maxGrade-res.minGrade);
														newScalePointDivLeft = (zeroX +j*delta*Math.cos(Math.PI*2*i/res.areas.length)-3);
														newScalePointDivTop = (zeroY -j*delta*Math.sin(Math.PI*2*i/res.areas.length)-5);	

														var newScalePointDiv = makeElement("", "div", "#"+res.areas[i], "axis-scale-points", newScalePointDivLeft, newScalePointDivTop, "", "");

														newScalePointDiv.textContent  = j;
													}	

													newCaptionDivLeft = (zeroX+(axisLength+captionDeltaX)*Math.cos(-Math.PI*2*i/res.areas.length));
													newCaptionDivTop = (zeroY+(axisLength+captionDeltaY)*Math.sin(-Math.PI*2*i/res.areas.length));			
													var newCaptionDiv = makeElement("", "mark", "#"+res.areas[i], "glyphicon glyphicon-pushpin text-capitalize  area-name", newCaptionDivLeft, newCaptionDivTop, "", "");

													newCaptionDiv.textContent  = local.areaСaptions[res.areas[i]];

												}



												$ajaxUtils.sendGetRequest(
												  devDataUrl, 
												  function(devData){
												  	if(devData == undefined)
												  		return;
												  	var tmp = [];
												  	tmp = devData.split("\n");
												  	var names = tmp[0].split(";");
												  	var tbl=[];
												  	var obj = {};
												  	obj.id = id;
												  	var k=0;

												  	for(var i=1;i<tmp.length;i++){
												  		var tmp1 = [];
												  		tmp1 = tmp[i].split(";");

												  		if (tmp1[0] == id){
												  			tbl[k] = [];
												  			for(var j=0;j<names.length;j++){
												  				tbl[k][names[j]] = tmp1[j];
												  			}
												  			k++;
														}
												  	}
												  	if(tbl.length>0) {
												  		obj.devName = tbl[0]["name"];
												  		obj.companyName = tbl[0]["company"];
												  		obj.examDate = tbl[0]["date"];
												  		obj.scores = [];
												  		for(var j=0;j<tbl.length;j++){
												  			var num = res.areas.indexOf(tbl[j]["areacode"]); 
												  			obj.scores[j] = {area: tbl[j]["areacode"], score: tbl[j]["score"], num: num};
												  		}
												  		console.log(obj);
												  	}


										  			txt = insertProperty(txt, "dev-company", obj.companyName);
										  			txt = insertProperty(txt, "dev-name", obj.devName);
										  			txt = insertProperty(txt, "dev-date", obj.examDate);
							  		

										  		

											  		var results = "";
											  		if(obj.scores.length>0){
													  	$ajaxUtils.sendGetRequest(
													  		resultRowUrl,
													  		function(row){
													  			for(var j=0;j<obj.scores.length; j++){
													  				var cl = "";
													  				for(pr in res.gradeColor){
													  					cl = pr;
													  					if(obj.scores[j].score > res.gradeColor[pr])
													  						break;
													  				}
													  				//console.log(cl);
													  				results += insertProperty(
													  						insertProperty(
													  							insertProperty(row, "dev-score-class", cl), "dev-score", obj.scores[j].score
													  						), "dev-area", local.areaСaptions[obj.scores[j].area]
													  					);
													  			}
													  			txt = insertProperty(txt, "result-rows", results);

													  			insertHtml(textSelector, txt);

													  			zeroPoint = makeElement("zeropoint", "div", mainSelector, "zero", zeroX-zeroPointDim/2, zeroY-zeroPointDim/2, zeroPointDim, zeroPointDim);
													  			zeroPoint.style.borderRadius = (zeroPointDim/2)+"px";

												  			
															  			 


										  								for(var i=0;i<obj.scores.length;i++){
																					var delta = obj.scores[i].score*(axisLength)/(res.maxGrade-res.minGrade);
																					var i1 = obj.scores[i].num;
																					newExamPointDivLeft = (zeroX +delta*Math.cos(Math.PI*2*i1/res.areas.length)-10);
																					newExamPointDivTop = (zeroY -delta*Math.sin(Math.PI*2*i1/res.areas.length)-10);

																					var newExamPointDiv = makeElement("", "div", "#"+obj.scores[i].area, "exam-point", newExamPointDivLeft, newExamPointDivTop, markPointDim, markPointDim);
																					newExamPointDiv.textContent = obj.scores[i].score;
																					newExamPointDiv.style.borderRadius = (markPointDim/2)+"px";

																		}	

													  			//console.log(obj);
													  		},						  		
													  		false
													  	);
											  		}				  		

				  		
 		


						}, 
					false);	

									  		},						  		
									  		true
									  	);	

				  	}, false);

				  	
				  }, 
				 true);		 									  			  	
}	


	global.$dc = dc;

})(window);

