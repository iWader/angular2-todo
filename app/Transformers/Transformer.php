<?php

namespace iWader\Angular2Demo\Transformers;

use DateTime;
use League\Fractal\TransformerAbstract;

abstract class Transformer extends TransformerAbstract
{
    protected function mutateDateTime(DateTime $date)
    {
        return $date->format(DateTime::ISO8601);
    }
}