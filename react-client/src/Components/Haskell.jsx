import React, { Component } from 'react';

import '../style.css'
import rgb1 from '../assets/images/CAT125_color_150_3_123.png'
import rgb2 from '../assets/images/CAT125_color_150_4_4242.png'
import rgb3 from '../assets/images/CAT125_color_150_5_99999.png'
import rgb4 from '../assets/images/CAT125_color_150_6_12.png'
import rgb5 from '../assets/images/CAT125_color_150_4_222.png'
import rgb6 from '../assets/images/CAT125_color_150_4_666622.png'

class Haskell extends Component {
    constructor(props) {
        super(props);
        this.state = { mounted: false };
    }
    componentDidMount() {
        this.setState({ mounted: true });
    }
    render() {
        return (
            <div className='background'>
                <div className="haskell-div">
                    <h3>Generating Images with Haskell</h3>
                    <h4>Introduction</h4>
                    In this post we explore the generation of images using an expression generator and evaluator
                    written with Haskell. The program for this post was part of CSE 130 at UCSD meaning the code will
                    not be open sourced.
                    <h4>Implementation Details</h4>
                    Our program provides us with a method:
                    <pre>
                        <code>
                    emitRandomColor :: Int -> (Int, Int) -> IO ()
                        </code>
                    </pre>
                    This method takes three inputs: image size, expression depth, and a random seed. It then constructs an
                    expression by using a random number generator and rule set to decide between function choices. The
                    expression grammar can be described as follows:
                    <pre>
                        <code>
                            <br />
                            = VarX<br />
                            &nbsp; | VarY<br />
                            &nbsp; | Sine    Expr<br />
                            &nbsp; | Cosine  Expr<br />
                            &nbsp; | Average Expr Expr<br />
                            &nbsp; | Times   Expr Expr<br />
                            &nbsp; | Thresh  Expr Expr Expr Expr<br />
                            &nbsp; | Sigmoid Expr<br />
                            &nbsp; | TanhSum Expr Expr Expr<br />
                            <br />
                        </code>
                    </pre>
                    Once the expression has been constructed to the provided depth, the function will proceed to evaluate
                    the x and y coordinates on a size x size square.It will use the x and y coordinates as inputs to the
                    generated expression.Notice, the range of all expressions is bounded between[-1, 1].As expected, the result
                    of the expression evaluation for a given (x, y) is translated into a pixel intensity.This is repeated 3 times
                    to map all three channels for RGB images.
                    <br />
                    <h4>Execution</h4>
                    <pre>
                        <code>
                            >>> emitRandomColor image_size (depth, seed)
                        </code>
                    </pre>
                    <br />
                    The first parameter "image_size" sets the size of the image to be generated.The next parameter "depth" sets depth of the
                    expression generation.The larger this number the more complicated the expression which is generated will be.The program also takes
                    exponentially longer time to generate images.The final parameter "seed" is used to initialize the random number generator.If you are not
                    familiar with seeding random number generators just know the value you choose to input as the seed will have a "random" effect on the image
                    that is generated.This can make use of the application quite fun as the search for the coolest seed is on!
                </div>
                <div className="haskell-div">
                    <h3>Results</h3>
                    <br />
                    <div>
                        <img src={rgb1} />
                    </div>
                    <br />
                    <div>
                        <pre>
                            <code>
                                        >>> emitRandomColor 150 (3, 123)
                            </code>
                        </pre>
                        <pre>
                            <code>
                                R: sigmoid(tan(sin(pi * x) + ((sin(pi * x) + cos(pi * y)) / 2) + sigmoid(y)))<br />
                                G: sin(pi * cos(pi * cos(pi * x)*sin(pi * y))*sin(pi * cos(pi * x)*sin(pi * x)))<br />
                                B: sigmoid(sigmoid(sin(pi * y)))
                            </code>
                        </pre>
                    </div>
                    <br />
                    <div>
                        <img src={rgb2} />
                    </div>
                    <br />
                    <div>
                        <pre>
                            <code>
                                >>> emitRandomColor 150 (4, 4242)
                            </code>
                        </pre>
                        <pre>
                            <code>
                                R: cos(pi * tan((sin(pi * cos(pi * sin(pi * cos(pi * y)*sin(pi * y)))*sin(pi * tan(x + x + x))) &lt; cos(pi * cos(pi * (sin(pi * cos(pi * y)*sin(pi * y)) &lt; cos(pi * cos(pi * y)*sin(pi * x)) ? cos(pi * cos(pi * x)*sin(pi * y)) : sin(pi * cos(pi * x)*sin(pi * y))))*sin(pi * tan(y + y + x))) ? cos(pi * cos(pi * sin(pi * x))*sin(pi * tan(x + x + y))) : sin(pi * cos(pi * tan(y + x + x))*sin(pi * sigmoid(y)))) + tan(tan(y + y + y) + cos(pi * x)*sin(pi * y) + sin(pi * cos(pi * x)*sin(pi * y))) + tan(tan(y + y + y) + ((sin(pi * y) + cos(pi * y)) / 2) + sin(pi * x))))*sin(pi * sin(pi * cos(pi * sin(pi * cos(pi * y)*sin(pi * y)))*sin(pi * sin(pi * y))))<br /><br />
                                G: cos(pi * ((sin(pi * tan((sin(pi * cos(pi * x)*sin(pi * y)) &lt; cos(pi * cos(pi * y)*sin(pi * x)) ? cos(pi * cos(pi * x)*sin(pi * x)) : sin(pi * cos(pi * y)*sin(pi * y))) + tan(y + x + y) + sigmoid(x))) + cos(pi * sigmoid(sin(pi * cos(pi * x)*sin(pi * x))))) / 2))*sin(pi * tan(tan(((sin(pi * x) + cos(pi * x)) / 2) + tan(y + y + x) + sigmoid(x)) + sin(pi * cos(pi * sin(pi * cos(pi * y)*sin(pi * x)))*sin(pi * tan(x + x + y))) + ((sin(pi * tan(x + y + y)) + cos(pi * cos(pi * x)*sin(pi * x))) / 2)))<br /><br />
                                B: tan(sigmoid((sin(pi * cos(pi * (sin(pi * cos(pi * y)*sin(pi * y)) &lt; cos(pi * cos(pi * y)*sin(pi * x)) ? cos(pi * cos(pi * y)*sin(pi * x)) : sin(pi * cos(pi * x)*sin(pi * y))))*sin(pi * sin(pi * x))) &lt; cos(pi * cos(pi * sin(pi * x))*sin(pi * tan(y + y + y))) ? cos(pi * cos(pi * sin(pi * x))*sin(pi * sin(pi * x))) : sin(pi * cos(pi * ((sin(pi * y) + cos(pi * y)) / 2))*sin(pi * tan(y + x + x))))) + ((sin(pi * tan((sin(pi * cos(pi * x)*sin(pi * x)) &lt; cos(pi * cos(pi * y)*sin(pi * y)) ? cos(pi * cos(pi * y)*sin(pi * x)) : sin(pi * cos(pi * x)*sin(pi * y))) + sigmoid(x) + tan(x + x + x))) + cos(pi * (sin(pi * cos(pi * tan(y + x + y))*sin(pi * cos(pi * x)*sin(pi * y))) &lt; cos(pi * cos(pi * tan(x + y + y))*sin(pi * tan(y + x + x))) ? cos(pi * cos(pi * tan(x + x + x))*sin(pi * sin(pi * cos(pi * y)*sin(pi * y)))) : sin(pi * cos(pi * ((sin(pi * y) + cos(pi * y)) / 2))*sin(pi * sin(pi * cos(pi * x)*sin(pi * x))))))) / 2) + sin(pi * cos(pi * tan(sigmoid(x) + sin(pi * cos(pi * x)*sin(pi * x)) + sigmoid(x)))*sin(pi * sin(pi * cos(pi * x)*sin(pi * y)))))<br />
                            </code>
                        </pre>
                    </div>
                    <br />
                    <br />
                    <br />
                    As you can tell, the expression size is getting very large. I will leave the expressions out in
                    the following images and will provide only the function call signature and resulting image.
                </div>
                <div className="haskell-div">
                    <div>
                        <h3>Gallery</h3>
                    </div>
                    <div className="inline-div">
                        <img src={rgb3} />
                    </div>
                    <div className="inline-div">
                        <img src={rgb4} />
                    </div>
                    <div className="inline-div">
                        <pre><code>
                                >>> emitRandomColor 150 (5, 99999)
                        </code></pre>
                    </div>
                    <div className="inline-div">
                        <pre><code>
                                >>> emitRandomColor 150 (6, 12)
                        </code></pre>
                    </div>
                    <div className={{ height: '200px' }} />
                    <div className="inline-div">
                        <img src={rgb5} />
                    </div>
                    <div className="inline-div">
                        <img src={rgb6} />
                    </div>
                    <div className="inline-div">
                        <pre><code>
                                >>> emitRandomColor 150 (4, 222)
                        </code></pre>
                    </div>
                    <div className="inline-div">
                        <pre><code>
                                >>> emitRandomColor 150 (4, 666622)
                        </code></pre>
                    </div>
                    <div className={{ height: '200px' }} />
                </div>
            </div>
        )
    }
}

export default Haskell;
