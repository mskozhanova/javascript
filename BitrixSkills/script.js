
	function BitrixArea(id, name, num){
		this.id = id;
		this.name = name;
		this.num = num;
	}
	BitrixArea.prototype.minGrade = 0;
	BitrixArea.prototype.maxGrade = 10;
	
/*
	var bitrixAreas = [
		new BitrixArea("design", "Дизайн", "Design"),
		new BitrixArea("tech", "Технологии", "Technologies"),
		new BitrixArea("adm", "Администрирование", "Administration"),
		new BitrixArea("complex", "Комплексный компонент", "Complex Component"),
		new BitrixArea("cache", "Кеширование", "Cache"),
		new BitrixArea("simple", "Простой компонент", "Simple Component"),
		new BitrixArea("handlers", "Обработчики", "Handlers"),
		new BitrixArea("agents", "Агенты", "Agents"),
	];
	*/
	var bitrixAreas = new Array();
	bitrixAreas["design"] = new BitrixArea("design", "Дизайн");
	bitrixAreas["tech"] = new BitrixArea("tech", "Технологии");
	bitrixAreas["adm"] = new BitrixArea("adm", "Администрирование");
	bitrixAreas["complex"] = new BitrixArea("complex", "Комплексный компонент");
	bitrixAreas["cache"] = new BitrixArea("cache", "Кеширование");
	bitrixAreas["simple"] = new BitrixArea("simple", "Простой компонент");
	bitrixAreas["handlers"] = new BitrixArea("tech", "Обработчики");
	bitrixAreas["agents"] = new BitrixArea("agents", "Агенты");
	
 	


	var bitrixAreasLength = 0;
	for(var prop  in bitrixAreas)
		bitrixAreasLength++;
	console.log(bitrixAreasLength);


	function BitrixAreaResult(areaId, mark){
		this.areaId = areaId;
		this.mark = mark;
	}


	function Exam(id, devName, companyName, examDate, areaResults){
		this.id = id;
		this.devName = devName;
		this.companyName = companyName;
		this.examDate = examDate;
		this.areaResults = areaResults;
	}

	var examPassed = new Exam(
		1234567, "Ася Петрова", "Микросайт", "29.02.2016",
		[
			new BitrixAreaResult("agents", 4),
			new BitrixAreaResult("design", 8),
			new BitrixAreaResult("tech", 6),
			new BitrixAreaResult("adm", 7),
			new BitrixAreaResult("complex", 5),
			new BitrixAreaResult("cache", 5),
			new BitrixAreaResult("simple", 9),
			new BitrixAreaResult("handlers", 8),
		]
	);

	//console.log(bitrixResult);
	//console.log(examPassed);


	var axisLength = 200;
	var zeroPointDim = 10;
	var captionDeltaX = 80;
	var captionDeltaY = 50;
	var markPointDim = 20;

	var zeroX = document.querySelector("#main").offsetWidth/2;
	var zeroY = document.querySelector("#main").offsetHeight/2;

	var captionDiv = document.createElement("div");
	captionDiv.className="titles";
	captionDiv.innerHTML += "<h1>Результат аттестации</h1>";
	captionDiv.innerHTML += "<p>Компания: "+examPassed.companyName+"</p>";
	captionDiv.innerHTML += "<p>Разработчик: "+examPassed.devName+"</p>";
	captionDiv.innerHTML += "<p>Дата: "+examPassed.examDate+"</p>";
	
	document.querySelector("#main").appendChild(captionDiv);	
	
	var zeroPoint = document.createElement("div");
	zeroPoint.className="zero";
	zeroPoint.style.left = (zeroX-zeroPointDim/2)+"px";
	zeroPoint.style.top = (zeroY-zeroPointDim/2)+"px";
	zeroPoint.style.width = zeroPointDim+"px";
	zeroPoint.style.height = zeroPointDim+"px";
	zeroPoint.style.borderRadius = (zeroPointDim/2)+"px";
	document.querySelector("#main").appendChild(zeroPoint);

	var i=0;
	for(var prop  in bitrixAreas){
		var newDivContainer = document.createElement("div");
		newDivContainer.id=prop;
		document.querySelector("#main").appendChild(newDivContainer);

		var newDiv = document.createElement("div");
		newDiv.className = "axis";
		newDiv.style.width = axisLength+"px";
		newDiv.style.left = (zeroX-axisLength/2+axisLength*Math.cos(-Math.PI*2*i/bitrixAreasLength)/2)+"px";
		newDiv.style.top = (zeroY+axisLength*Math.sin(-Math.PI*2*i/bitrixAreasLength)/2)+"px";	
		newDiv.style.transform = "rotate("+(-360*i/bitrixAreasLength)+"deg)";
		newDivContainer.appendChild(newDiv);

		for(var j=bitrixAreas[prop].minGrade+2;j<=bitrixAreas[prop].maxGrade;j=j+2){
			var newScalePointDiv = document.createElement("div");
			newScalePointDiv.className = "axis-scale-points";
			newScalePointDiv.textContent  = j;
			var delta = (axisLength)/(bitrixAreas[prop].maxGrade-bitrixAreas[prop].minGrade);
			newScalePointDiv.style.left = (zeroX +j*delta*Math.cos(Math.PI*2*i/bitrixAreasLength)-3)+"px";
			newScalePointDiv.style.top = (zeroY -j*delta*Math.sin(Math.PI*2*i/bitrixAreasLength)-5)+"px";	
			newDivContainer.appendChild(newScalePointDiv);
		}

		var newCaptionDiv = document.createElement("span");
		newCaptionDiv.className = "area-name";
		newCaptionDiv.textContent  = bitrixAreas[prop].name;
		newCaptionDiv.style.left = (zeroX+(axisLength+captionDeltaX)*Math.cos(-Math.PI*2*i/bitrixAreasLength))+"px";
		newCaptionDiv.style.top = (zeroY+(axisLength+captionDeltaY)*Math.sin(-Math.PI*2*i/bitrixAreasLength))+"px";			
		newDivContainer.appendChild(newCaptionDiv);

		bitrixAreas[prop].num = i;
		i++;
	}

	console.log(bitrixAreas);

	var resultTable = document.createElement("table");
	resultTable.className = "results";
	var resultTableHead = document.createElement("thead");
	resultTableHead.innerHTML = "<td>область</td><td>оценка</td>";
	resultTable.appendChild(resultTableHead);

	for(var i=0;i<examPassed.areaResults.length;i++){
			var newExamPointDiv = document.createElement("div");
			newExamPointDiv.className = "exam-point";
			newExamPointDiv.textContent = examPassed.areaResults[i].mark;
			var delta = examPassed.areaResults[i].mark*(axisLength)/(bitrixAreas[examPassed.areaResults[i].areaId].maxGrade-bitrixAreas[examPassed.areaResults[i].areaId].minGrade);
			var i1 = bitrixAreas[examPassed.areaResults[i].areaId].num;
			newExamPointDiv.style.left = (zeroX +delta*Math.cos(Math.PI*2*i1/bitrixAreasLength)-10)+"px";
			newExamPointDiv.style.top = (zeroY -delta*Math.sin(Math.PI*2*i1/bitrixAreasLength)-10)+"px";
			newExamPointDiv.style.width = markPointDim+"px";
			newExamPointDiv.style.height = markPointDim+"px";
			newExamPointDiv.style.borderRadius = (markPointDim/2)+"px";
			document.querySelector("#"+examPassed.areaResults[i].areaId).appendChild(newExamPointDiv);

			var resultTableTr = document.createElement("tr");
			resultTableTr.innerHTML = "<td>"+bitrixAreas[examPassed.areaResults[i].areaId].name+"</td><td>"+examPassed.areaResults[i].mark+"</td>";
			resultTable.appendChild(resultTableTr);
	}

	document.querySelector("#main").appendChild(resultTable);

