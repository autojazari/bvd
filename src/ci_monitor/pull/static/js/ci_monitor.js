/**

* CI-Monitor v1.0 A Continous Integration Monitoring Tool

* Copyright (c) 2012 Voltage Security
* All rights reserved.

* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions
* are met:
* 1. Redistributions of source code must retain the above copyright
*    notice, this list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright
*    notice, this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. The name of the author may not be used to endorse or promote products
*    derived from this software without specific prior written permission.
* 
* THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
* IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
* OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
* IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
* INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
* NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
* THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

**/

var CIMonitor = CIMonitor || {};

var Poll = function(url) {
	var self = this;
	self.created = {};
		
	var success = function(data) {
		self.draw_widgets(data);
	};
	
	var error = function(data) { 
		//catch-all 
		alert('Please check CI System URIs in settings.py');
	};
	
	this.ajax = function() {
		CIMonitor.utils.do_ajax('get',url,{}, function(data) {
    	    data = eval(data);
    	    CIMonitor.utils.remove_old_widgetsremove_old_widgets();
    	    CIMonitor.utils.remove_old_widgetsredraw_widgets(data);
    	});
	}
}

$(function(){

	var poll = new Poll('/pull/pull_jobs/');
   
    var jenkins = function() {
    	if ($("#add_job_modal").length == 0) {
        	poll.ajax();
        }
    }
	
	setInterval(jenkins,'60000');
	
	var resize = function(data) {
	    
	    var curr_width = $(this).width();
	    var curr_height = $(this).height();
	    var max_width = $("#widgets").children(0).css('width');
	    var max_height =  $("#widgets").children(0).css('height');
	    
	    var ratio = curr_height / curr_width;
	    
	    if ((curr_width/5) >= max_width && ratio <= 1) {
	        curr_width = max_width ;
	        curr_height = max_width * ratio;
        } else {
            curr_height = (curr_width/5) * ratio;
            curr_width = curr_height;
        }
	    
	    for (hostname in CIMonitor.widget_map) {
    		$widgets = CIMonitor.widget_map[hostname];
    		for (i=0; i < $widgets.length; i++) {
    			$widgets[i].resize(curr_width,curr_height);
    		}
    	}
	}
	
	$(window).resize(resize);
	
    
});
