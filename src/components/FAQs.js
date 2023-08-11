import React, { Component } from 'react';

class FAQs extends Component {
    render() {
        return (
          <div className="container contenido">
            <div className="row">
              <div className="col-md-12 mb-4">
                <h1 className="text-center text-white titulo font-family-SpaceGrotesk-Light">
                  FAQs
                </h1>
              </div>
              <div className="col-md-12">
                <div className="box-acordeon">
                  <h2 className='font-family-SpaceGrotesk-SemiBold text-white'>Subject</h2>
                  <div className="accordion" id="faq">
                    <div className="card">
                        <div className="card-header" id="faqhead1">
                            <a href="#faq1" className="btn-header-link font-family-SpaceGrotesk-Medium" data-toggle="collapse" data-target="#faq1" aria-expanded="true" aria-controls="faq1">
                                Sample of a frequently asked question
                            </a>
                        </div>

                        <div id="faq1" className="collapse show" aria-labelledby="faqhead1" data-parent="#faq">
                            <div className="card-body font-family-SpaceGrotesk-Light">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                                moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                                proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                                aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="faqhead2">
                            <a href="#faq2" className="btn-header-link collapsed font-family-SpaceGrotesk-Medium" data-toggle="collapse" data-target="#faq2" aria-expanded="true" aria-controls="faq2">
                                Sample of a frequently asked question
                            </a>
                        </div>

                        <div id="faq2" className="collapse" aria-labelledby="faqhead2" data-parent="#faq">
                            <div class="card-body font-family-SpaceGrotesk-Light">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                                moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                                proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                                aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="faqhead3">
                            <a href="#faq3" className="btn-header-link collapsed font-family-SpaceGrotesk-Medium" data-toggle="collapse" data-target="#faq3" aria-expanded="true" aria-controls="faq3">
                                Sample of a frequently asked question
                            </a>
                        </div>

                        <div id="faq3" className="collapse" aria-labelledby="faqhead3" data-parent="#faq">
                            <div className="card-body font-family-SpaceGrotesk-Light">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                                moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                                proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                                aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                        </div>
                    </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default FAQs;
