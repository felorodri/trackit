import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationsService } from '../services/notifications.service';
import { TranslationsService } from '../services/translations.service';
declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public currentDate: Date;

  constructor(
    public auth: AuthService,
    public router: Router,
    private notify: NotificationsService,
    private trans: TranslationsService
  ) {}

  ngOnInit() {
    if (this.auth.currentUser()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.currentDate = new Date();
      /*! The following piece of code was taken, converted to typescript and modifiedfrom the file titled "material-kit.js" of the
       * free material kit created by Creative Tim.
       * Copyright notice added as required.
       */
      /*!
       =========================================================
       * Material Kit - v2.0.5
       =========================================================
       * Product Page: https://www.creative-tim.com/product/material-kit
       * Copyright 2018 Creative Tim (http://www.creative-tim.com)
       * Designed by www.invisionapp.com Coded by www.creative-tim.com
       =========================================================
       * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
       */
      let big_image;
      const BrowserDetect = {
        init: function() {
          this.browser = this.searchString(this.dataBrowser) || 'Other';
          this.version =
            this.searchVersion(navigator.userAgent) ||
            this.searchVersion(navigator.appVersion) ||
            'Unknown';
        },
        searchString: function(data) {
          for (let i = 0; i < data.length; i++) {
            const dataString = data[i].string;
            this.versionSearchString = data[i].subString;
            if (dataString.indexOf(data[i].subString) !== -1) {
              return data[i].identity;
            }
          }
        },
        searchVersion: function(dataString) {
          const index = dataString.indexOf(this.versionSearchString);
          if (index === -1) {
            return;
          }
          const rv = dataString.indexOf('rv:');
          if (this.versionSearchString === 'Trident' && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
          } else {
            return parseFloat(
              dataString.substring(index + this.versionSearchString.length + 1)
            );
          }
        },
        dataBrowser: [
          {
            string: navigator.userAgent,
            subString: 'Chrome',
            identity: 'Chrome'
          },
          {
            string: navigator.userAgent,
            subString: 'MSIE',
            identity: 'Explorer'
          },
          {
            string: navigator.userAgent,
            subString: 'Trident',
            identity: 'Explorer'
          },
          {
            string: navigator.userAgent,
            subString: 'Firefox',
            identity: 'Firefox'
          },
          {
            string: navigator.userAgent,
            subString: 'Safari',
            identity: 'Safari'
          },
          {
            string: navigator.userAgent,
            subString: 'Opera',
            identity: 'Opera'
          }
        ]
      };
      BrowserDetect.init();
      // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link
      // https://github.com/FezVrasta/bootstrap-material-design#materialjs
      $('body').bootstrapMaterialDesign();
      const window_width = $(window).width();
      const $navbar = $('.navbar[color-on-scroll]');
      const scroll_distance = $navbar.attr('color-on-scroll') || 500;
      const $navbar_collapse = $('.navbar').find('.navbar-collapse');
      const materialKit = {
        misc: {
          navbar_menu_visible: 0,
          window_width: 0,
          transparent: true,
          fixedTop: false,
          navbar_initialized: false,
          isWindow: document['documentMode'] || /Edge/.test(navigator.userAgent)
        },
        initFormExtendedDatetimepickers: function() {
          $('.datetimepicker').datetimepicker({
            icons: {
              time: 'fa fa-clock-o',
              date: 'fa fa-calendar',
              up: 'fa fa-chevron-up',
              down: 'fa fa-chevron-down',
              previous: 'fa fa-chevron-left',
              next: 'fa fa-chevron-right',
              today: 'fa fa-screenshot',
              clear: 'fa fa-trash',
              close: 'fa fa-remove'
            }
          });
        },
        checkScrollForParallax: function() {
          const oVal = $(window).scrollTop() / 3;
          big_image.css({
            transform: 'translate3d(0,' + oVal + 'px,0)',
            '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
          });
        },
        checkScrollForTransparentNavbar: this.debounce(
          function() {
            if ($(document).scrollTop() > scroll_distance) {
              if (materialKit.misc.transparent) {
                materialKit.misc.transparent = false;
                $('.navbar-color-on-scroll').removeClass('navbar-transparent');
              }
            } else {
              if (!materialKit.misc.transparent) {
                materialKit.misc.transparent = true;
                $('.navbar-color-on-scroll').addClass('navbar-transparent');
              }
            }
          },
          17,
          null
        )
      };
      //  Activate the Tooltips
      $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
      // Activate Popovers
      $('[data-toggle="popover"]').popover();
      $('.home').on('click', '.navbar-toggler', function() {
        const $toggle = $(this);
        if (materialKit.misc.navbar_menu_visible === 1) {
          $('.home').removeClass('nav-open');
          materialKit.misc.navbar_menu_visible = 0;
          $('#homeBodyClick').remove();
          setTimeout(function() {
            $toggle.removeClass('toggled');
          }, 550);
          $('.home').removeClass('nav-open-absolute');
        } else {
          setTimeout(function() {
            $toggle.addClass('toggled');
          }, 580);
          const div = '<div id="homeBodyClick"></div>';
          $(div)
            .appendTo('.home')
            .click(function() {
              $('.home').removeClass('nav-open');
              if ($('nav').hasClass('navbar-absolute')) {
                $('.home').removeClass('nav-open-absolute');
              }
              materialKit.misc.navbar_menu_visible = 0;
              $('#homeBodyClick').remove();
              setTimeout(function() {
                $toggle.removeClass('toggled');
              }, 550);
            });
          if ($('nav').hasClass('navbar-absolute')) {
            $('.home').addClass('nav-open-absolute');
          }
          $('.home').addClass('nav-open');
          materialKit.misc.navbar_menu_visible = 1;
        }
      });
      if ($('.navbar-color-on-scroll').length !== 0) {
        $(window).on('scroll', materialKit.checkScrollForTransparentNavbar);
      }
      materialKit.checkScrollForTransparentNavbar();
      if (window_width >= 768) {
        big_image = $('.page-header[data-parallax="true"]');
        if (big_image.length !== 0) {
          $(window).on('scroll', materialKit.checkScrollForParallax);
        }
      }
      const better_browser =
        '<div class="container"><div class="better-browser row"><div class="col-md-2"></div><div class="col-md-8"><h3>We are sorry but it looks like your Browser doesn\'t support our website Features. In order to get the full experience please download a new version of your favourite browser.</h3></div><div class="col-md-2"></div><br><div class="col-md-4"><a href="https://www.mozilla.org/ro/firefox/new/" class="btn btn-warning">Mozilla</a><br></div><div class="col-md-4"><a href="https://www.google.com/chrome/browser/desktop/index.html" class="btn ">Chrome</a><br></div><div class="col-md-4"><a href="http://windows.microsoft.com/en-us/internet-explorer/ie-11-worldwide-languages" class="btn">Internet Explorer</a><br></div><br><br><h4>Thank you!</h4></div></div>';
    }
  }

  /*! This method was extracted from the original code of "material-kit.js" and pulled it out
   * from the ngOnInit method to simplify its usage.
   */
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  debounce(func, wait, immediate): any {
    let timeout;
    return function() {
      const context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      }, wait);
      if (immediate && !timeout) {
        func.apply(context, args);
      }
    };
  }

  scrollToAboutMe(): void {

  }

  scrollToAboutProject(): void {
    if ($('.section-basic').length !== 0) {
        if($('#homeBodyClick')) {
          $('#homeBodyClick').trigger('click');
        }
        $('html, body').animate({
          scrollTop: $('.section-basic').offset().top
        }, 1000);
      }
  }

  changeLanguage(language) {

  }
}
