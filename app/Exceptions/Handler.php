<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;   
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Illuminate\Http\Exceptions\PostTooLargeException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $e)
    {
        // Token Token Exeption
        if($e instanceof TokenInvalidException){
            return response()->json(['error'=>'Token is Invalid'], 400);
        }
        else if($e instanceof TokenExpiredException){
            return response()->json(['error'=>'Token is Expired'], 400);
        }
        else if($e instanceof JWTException){
            return response()->json(['error'=>'Something problem with token'], 400);
        }else if($e instanceof UnauthorizedHttpException) {
            return response()->json(['error'=>'Unauthorized'], 403);
        }

        //Method Exeption
        if ($e instanceof MethodNotAllowedHttpException)
        return response()->json( [
            'success' => 0,
            'error' => 'The method is not allowed for this route',
        ], 405 );
        

        if ($e instanceof PostTooLargeException)
        return response()->json( [
            'success' => 0,
            'error' => 'Payload Too Large',
        ], 413 );

        return parent::render($request, $e);
    }
}
